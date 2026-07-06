import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

// ============ GOOGLE OAUTH ============
console.log("🔍 Google OAuth Config:");
console.log("Client ID:", process.env.GOOGLE_CLIENT_ID?.slice(0, 20) + "...");
console.log("Callback URL:", `${process.env.SERVER_URL}/api/auth/google/callback`);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("📝 Google profile received:", profile.id);
        
        if (!profile.emails || profile.emails.length === 0) {
          console.error("❌ No email found in profile");
          return done(new Error("No email found"), null);
        }

        const email = profile.emails[0].value;
        const fullName = profile.displayName || email.split("@")[0];
        const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
        const avatar = profile.photos?.[0]?.value || "";

        let user = await User.findOne({ email });

        if (user) {
          if (!user.avatar && avatar) {
            user.avatar = avatar;
            await user.save();
          }
          console.log("✅ Existing user found:", user.email);
          return done(null, user);
        }

        user = await User.create({
          fullName,
          username,
          email,
          avatar,
          isVerified: true,
          password: Math.random().toString(36).slice(-12),
        });

        console.log("✅ New user created:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("❌ Google Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

// ============ GITHUB OAUTH ============
console.log("🔍 GitHub OAuth Config:");
console.log("Client ID:", process.env.GITHUB_CLIENT_ID?.slice(0, 20) + "...");
console.log("Callback URL:", `${process.env.SERVER_URL}/api/auth/github/callback`);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("📝 GitHub profile received:", profile.id);
        
        // Get primary email from GitHub
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        const fullName = profile.displayName || profile.username;
        const username = profile.username;
        const avatar = profile.photos?.[0]?.value || "";

        // Check if user exists by email or username
        let user = await User.findOne({ 
          $or: [{ email }, { username }] 
        });

        if (user) {
          if (!user.avatar && avatar) {
            user.avatar = avatar;
            await user.save();
          }
          console.log("✅ Existing user found:", user.email);
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          fullName,
          username,
          email,
          avatar,
          isVerified: true,
          password: Math.random().toString(36).slice(-12),
        });

        console.log("✅ New user created:", user.email);
        return done(null, user);
      } catch (error) {
        console.error("❌ GitHub Strategy Error:", error);
        return done(error, null);
      }
    }
  )
);

// ============ SERIALIZATION ============
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;