import conf from "../conf/conf.js";
import {
  Client,
  ID,
  TablesDB,
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
      .setEndpoint(conf.appwriteUrl) // Appwrite endpoint
      .setProject(conf.appwriteProjectId); // Project ID

    this.databases = new TablesDB(this.client);
    this.buckets = new Storage(this.client);
  }

  //we are taking thr title slug, content, featureImage, status, userId as parameters from the user to create a post
  async createPost({ title, slug, content, featureImage, status, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug,
        data: {
          title: title,
          slug: slug,
          content: content,
          featureImage: featureImage,
          status: status,
          userId: userId,
        },
        permissions: [
          Permission.read(Role.any()), // Public read access
          Permission.write(Role.user(userId)), // Write access to the post creator
        ],
      });
    } catch (error) {
      console.log("Appwrite Service createPost error:", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug,
        data: {
          title: title,
          content: content,
          featureImage: featureImage,
          status: status,
        },
      });
    } catch (error) {
      console.log("Appwrite Service updatePost error:", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite Service deletePost error:", error);

      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite Service getPost error:", error);
    }
  }
  // I wnat to get all the posts whose status is active right now
  async getPosts() {
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteTableId,
        queries: [Query.equal("status", "active")],
      });
    } catch (error) {
      console.log("Appwrite Service getPosts error:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
         await this.buckets.createFile({
            bucketId: conf.appwriteBucketId,
            fileId: ID.unique(),
            file: file,
            
        })
        return true;
    } catch (error) {
      console.log("Appwrite Service uploadFile error:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
         await this.buckets.deleteFile({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
        }
    
        )
        return true;
    } catch (error) {
      console.log("Appwrite Service deleteFile error:", error);
      return false
    }
  }

  async getFilePreview(fileId) {
    try {
         await this.buckets.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
        })
        return true;
    } catch (error) {
      console.log("Appwrite Service getFilePreview error:", error);
      return false;
    }
  }
}

const service = new Service(); // Creating an object of Service class

export default service; // Exporting the object of Service class
