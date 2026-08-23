import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title:   post?.title   || "",
            slug:    post?.$id     || "",
            content: post?.content || "",
            status:  post?.status  || "active",
        },
    });

    const navigate    = useNavigate();
    const userData    = useSelector((state) => state.auth.userData);
    const fileInputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(
        post ? appwriteService.getFilePreview(post.featuredImage) : null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Destructure ref out of register so we can merge it with fileInputRef
    const { ref: imageRegisterRef, onChange: imageRegisterOnChange, ...imageRegisterRest } =
        register("image", { required: !post });

    // ── Submit logic (unchanged) ───────────────────────────────────────────
    const submit = async (data) => {
        setIsSubmitting(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) appwriteService.deleteFile(post.featuredImage);
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });
                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Auto-slug from title ───────────────────────────────────────────────
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // ── Image preview handler ──────────────────────────────────────────────
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
        >
            {/* ── Title ──────────────────────────────────────────────────── */}
            <Input
                label="Title"
                placeholder="Enter a compelling title…"
                style={{ height: 52, fontSize: "var(--text-base)" }}
                {...register("title", { required: true })}
            />

            {/* ── Slug ───────────────────────────────────────────────────── */}
            <div>
                <Input
                    label="Slug"
                    placeholder="auto-generated-from-title"
                    style={{ height: 52 }}
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                />
                <p style={{
                    marginTop: "var(--space-1)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-muted)",
                    paddingLeft: "var(--space-1)",
                }}>
                    Auto-generated from title. You can edit it manually.
                </p>
            </div>

            {/* ── Content editor ─────────────────────────────────────────── */}
            <div>
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* ── Meta row: Image + Status ───────────────────────────────── */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-6)",
            }}
                className="post-form-meta"
            >
                {/* Featured Image */}
                <div>
                    <label className="field-label">Featured Image</label>

                    {/* Custom file trigger */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            border: "2px dashed var(--color-border)",
                            borderRadius: "var(--radius-md)",
                            padding: previewUrl ? 0 : "var(--space-8) var(--space-4)",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "var(--space-2)",
                            background: "var(--color-surface-raised)",
                            transition: "border-color var(--transition-fast), background var(--transition-fast)",
                            overflow: "hidden",
                            minHeight: previewUrl ? "auto" : 140,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--color-primary)";
                            e.currentTarget.style.background  = "var(--color-primary-muted)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--color-border)";
                            e.currentTarget.style.background  = "var(--color-surface-raised)";
                        }}
                    >
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    maxHeight: 200,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        ) : (
                            <>
                                <span style={{ fontSize: "1.75rem" }}>🖼️</span>
                                <p style={{
                                    fontSize: "var(--text-sm)",
                                    color: "var(--color-text-secondary)",
                                    textAlign: "center",
                                    margin: 0,
                                }}>
                                    Click to upload image
                                </p>
                                <p style={{
                                    fontSize: "var(--text-xs)",
                                    color: "var(--color-text-muted)",
                                    margin: 0,
                                }}>
                                    PNG, JPG, GIF supported
                                </p>
                            </>
                        )}
                    </div>

                    {previewUrl && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                marginTop: "var(--space-2)",
                                fontSize: "var(--text-xs)",
                                color: "var(--color-primary)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            Change image
                        </button>
                    )}

                    {/* Hidden real input — ref combines RHF ref + our own fileInputRef */}
                    <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        style={{ display: "none" }}
                        ref={(e) => {
                            imageRegisterRef(e);   // react-hook-form ref
                            fileInputRef.current = e; // our own ref for click()
                        }}
                        onChange={async (e) => {
                            await imageRegisterOnChange(e); // notify RHF
                            handleImageChange(e);           // update preview
                        }}
                        {...imageRegisterRest}
                    />
                </div>

                {/* Status */}
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        {...register("status", { required: true })}
                    />
                    <p style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--color-text-muted)",
                        margin: 0,
                        lineHeight: "var(--leading-relaxed)",
                    }}>
                        <strong style={{ color: "var(--color-text-secondary)" }}>Active</strong> posts are publicly visible.{" "}
                        <strong style={{ color: "var(--color-text-secondary)" }}>Inactive</strong> posts are drafts.
                    </p>
                </div>
            </div>

            {/* ── Divider ────────────────────────────────────────────────── */}
            <hr className="divider" />

            {/* ── Actions ────────────────────────────────────────────────── */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "var(--space-3)",
            }}>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant={post ? "success" : "primary"}
                    size="lg"
                    disabled={isSubmitting}
                    style={{ minWidth: 160, opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting
                        ? (post ? "Saving…" : "Publishing…")
                        : (post ? "Update Post" : "Create Post")}
                </Button>
            </div>
        </form>
    );
}