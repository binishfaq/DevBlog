import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Import your Post model
import Post from "./models/Post.js";

const fixPosts = async () => {
  try {
    console.log("🔍 Starting fix-posts script...");
    
    // Connect to MongoDB with timeout
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/devblog";
    console.log(`📡 Connecting to MongoDB: ${mongoURI}`);
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log("✅ Connected to MongoDB");

    // Find all posts
    const posts = await Post.find();
    console.log(`📝 Found ${posts.length} posts`);

    if (posts.length === 0) {
      console.log("⚠️ No posts found in database.");
      console.log("💡 Create a post first through the app.");
      await mongoose.disconnect();
      process.exit(0);
    }

    let fixedCount = 0;

    for (const post of posts) {
      let needsUpdate = false;
      
      console.log(`\n📄 Checking post: ${post.title || "Untitled"}`);
      
      // Fix likes
      if (Array.isArray(post.likes)) {
        console.log(`   ❌ likes is an array: ${JSON.stringify(post.likes)}`);
        post.likes = 0;
        needsUpdate = true;
        console.log(`   ✅ Fixed likes to: 0`);
      } else {
        console.log(`   ✅ likes is a number: ${post.likes}`);
      }
      
      // Fix views
      if (Array.isArray(post.views)) {
        console.log(`   ❌ views is an array: ${JSON.stringify(post.views)}`);
        post.views = 0;
        needsUpdate = true;
        console.log(`   ✅ Fixed views to: 0`);
      } else {
        console.log(`   ✅ views is a number: ${post.views}`);
      }
      
      // Fix comments if needed
      if (!Array.isArray(post.comments)) {
        console.log(`   ❌ comments is not an array`);
        post.comments = [];
        needsUpdate = true;
        console.log(`   ✅ Fixed comments to: []`);
      } else {
        console.log(`   ✅ comments is an array: ${post.comments.length} items`);
      }
      
      if (needsUpdate) {
        await post.save();
        fixedCount++;
        console.log(`   ✅ Updated post: ${post.title}`);
      } else {
        console.log(`   ℹ️ No changes needed`);
      }
    }

    console.log(`\n🎉 Fixed ${fixedCount} posts!`);
    
    // Show summary
    const allPosts = await Post.find();
    console.log(`\n📊 Summary:`);
    console.log(`   Total posts: ${allPosts.length}`);
    console.log(`   Fixed posts: ${fixedCount}`);
    
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
    try {
      await mongoose.disconnect();
    } catch (e) {}
    process.exit(1);
  }
};

fixPosts();