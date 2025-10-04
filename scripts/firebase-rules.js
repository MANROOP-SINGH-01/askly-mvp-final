// Firestore Security Rules for Ask!y MVP
// Run this script to set up proper security rules

const rules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Subjects are read-only for all authenticated users
    match /subjects/{subjectId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty';
    }
    
    // Quizzes are readable by all, writable by faculty
    match /quizzes/{quizId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty';
    }
    
    // Quiz attempts are private to the user
    match /quizAttempts/{attemptId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Flashcard sets are readable by all, writable by faculty
    match /flashcardSets/{setId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty';
    }
    
    // Flashcard sessions are private to the user
    match /flashcardSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Posts are readable by all, writable by author
    match /posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.authorId;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.authorId ||
         (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty'));
      allow delete: if request.auth != null && 
        (request.auth.uid == resource.data.authorId ||
         (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
          get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'faculty'));
    }
    
    // Replies are readable by all, writable by author
    match /replies/{replyId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.authorId;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.authorId;
    }
    
    // Chat sessions are private to the user
    match /chatSessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Achievements are read-only
    match /achievements/{achievementId} {
      allow read: if request.auth != null;
    }
    
    // User achievements are private to the user
    match /userAchievements/{userAchievementId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
`

console.log("Firebase Security Rules:")
console.log(rules)
console.log("\nTo apply these rules:")
console.log("1. Go to Firebase Console > Firestore Database > Rules")
console.log("2. Replace the existing rules with the above rules")
console.log('3. Click "Publish" to apply the changes')
