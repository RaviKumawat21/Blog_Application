import conf from "../conf/conf.js";
import { Client, Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Appwrite endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.account = new Account(this.client);
    }

    // Method to create a new user
    async createUser(email, password, name){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           
           if(userAccount){
            //call another method after creating the user account
           }else{
            return userAccount
           }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentuser(){
        try {
           return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            throw error;
        }
    }
}



const authService = new AuthService(); // Creating an object of AuthService class

export default authService; // Exporting the object of AuthService class