import conf from "../conf/conf.js";
import {
  Client,
  ID,
  Databases,
  Permission,
  Role,
  Storage,
  Query,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  buckets;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client); // ✅ was TablesDB (wrong alias)
    this.buckets   = new Storage(this.client);
  }

  // ── Posts ────────────────────────────────────────────────────────────────

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      // Appwrite SDK uses positional args, NOT an options object
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,                    // documentId
        { title, slug, content, featuredImage, status, userId },
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(userId)),
        ]
      );
    } catch (error) {
      console.log("Appwrite Service createPost error:", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite Service updatePost error:", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service deletePost error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service getPost error:", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Service getPosts error:", error);
      throw error;
    }
  }

  // ── Storage ──────────────────────────────────────────────────────────────

  async uploadFile(file) {
    try {
      // Must return the full response so callers can access file.$id
      return await this.buckets.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service uploadFile error:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.buckets.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service deleteFile error:", error);
      return false;
    }
  }

  // Returns a direct URL string (sync — no await needed)
  getFilePreview(fileId) {
    return this.buckets.getFilePreview(
      conf.appwriteBucketId,
      fileId
    );
  }
}

const appwriteService = new Service();
export default appwriteService;
