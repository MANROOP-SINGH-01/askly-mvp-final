-- Seed data for Ask!y MVP
-- This script creates sample data for testing and demonstration

-- Sample subjects
INSERT INTO subjects (id, name, description, created_at) VALUES
('dbms', 'Database Management Systems', 'Comprehensive DBMS concepts and SQL', NOW()),
('networking', 'Computer Networking', 'Network protocols, architecture, and security', NOW()),
('general', 'General Computer Science', 'General CS topics and programming concepts', NOW());

-- Sample quizzes for DBMS
INSERT INTO quizzes (id, title, description, subject_id, difficulty, questions, created_by, created_at) VALUES
('quiz_dbms_1', 'SQL Fundamentals', 'Basic SQL queries and operations', 'dbms', 'beginner', 
'[
  {
    "question": "What does SQL stand for?",
    "options": ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
    "correct": 0,
    "explanation": "SQL stands for Structured Query Language, used for managing relational databases."
  },
  {
    "question": "Which command is used to retrieve data from a database?",
    "options": ["GET", "SELECT", "FETCH", "RETRIEVE"],
    "correct": 1,
    "explanation": "SELECT is the SQL command used to retrieve data from database tables."
  },
  {
    "question": "What is a primary key?",
    "options": ["A key that opens the database", "A unique identifier for records", "The first column in a table", "A password for the database"],
    "correct": 1,
    "explanation": "A primary key uniquely identifies each record in a database table."
  }
]', 'system', NOW()),

('quiz_dbms_2', 'Database Normalization', 'Understanding normal forms and normalization', 'dbms', 'intermediate',
'[
  {
    "question": "What is the main purpose of database normalization?",
    "options": ["To increase data redundancy", "To reduce data redundancy", "To make queries slower", "To increase storage space"],
    "correct": 1,
    "explanation": "Database normalization reduces data redundancy and improves data integrity."
  },
  {
    "question": "Which normal form eliminates partial dependencies?",
    "options": ["1NF", "2NF", "3NF", "BCNF"],
    "correct": 1,
    "explanation": "Second Normal Form (2NF) eliminates partial dependencies on composite keys."
  }
]', 'system', NOW());

-- Sample quizzes for Networking
INSERT INTO quizzes (id, title, description, subject_id, difficulty, questions, created_by, created_at) VALUES
('quiz_net_1', 'OSI Model Basics', 'Understanding the 7-layer OSI model', 'networking', 'beginner',
'[
  {
    "question": "How many layers are in the OSI model?",
    "options": ["5", "6", "7", "8"],
    "correct": 2,
    "explanation": "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
  },
  {
    "question": "Which layer is responsible for routing?",
    "options": ["Physical", "Data Link", "Network", "Transport"],
    "correct": 2,
    "explanation": "The Network layer (Layer 3) is responsible for routing packets between networks."
  }
]', 'system', NOW()),

('quiz_net_2', 'TCP vs UDP', 'Understanding transport layer protocols', 'networking', 'intermediate',
'[
  {
    "question": "Which protocol is connection-oriented?",
    "options": ["UDP", "TCP", "Both", "Neither"],
    "correct": 1,
    "explanation": "TCP is connection-oriented, establishing a connection before data transfer."
  },
  {
    "question": "Which protocol is faster for real-time applications?",
    "options": ["TCP", "UDP", "Both are equal", "Depends on network"],
    "correct": 1,
    "explanation": "UDP is faster for real-time applications as it has less overhead than TCP."
  }
]', 'system', NOW());

-- Sample flashcard sets
INSERT INTO flashcard_sets (id, title, description, subject_id, cards, created_by, created_at) VALUES
('flashcards_dbms_1', 'SQL Commands', 'Essential SQL commands and syntax', 'dbms',
'[
  {
    "front": "SELECT statement syntax",
    "back": "SELECT column1, column2 FROM table_name WHERE condition;"
  },
  {
    "front": "INSERT statement syntax",
    "back": "INSERT INTO table_name (column1, column2) VALUES (value1, value2);"
  },
  {
    "front": "UPDATE statement syntax",
    "back": "UPDATE table_name SET column1 = value1 WHERE condition;"
  },
  {
    "front": "DELETE statement syntax",
    "back": "DELETE FROM table_name WHERE condition;"
  }
]', 'system', NOW()),

('flashcards_net_1', 'Network Protocols', 'Common network protocols and their purposes', 'networking',
'[
  {
    "front": "HTTP",
    "back": "HyperText Transfer Protocol - Used for web communication"
  },
  {
    "front": "HTTPS",
    "back": "HTTP Secure - Encrypted version of HTTP using SSL/TLS"
  },
  {
    "front": "FTP",
    "back": "File Transfer Protocol - Used for transferring files"
  },
  {
    "front": "SMTP",
    "back": "Simple Mail Transfer Protocol - Used for sending emails"
  }
]', 'system', NOW());

-- Sample forum posts
INSERT INTO posts (id, title, content, subject_id, tags, author_id, author_name, created_at, upvotes, downvotes, replies, views) VALUES
('post_1', 'Best practices for database design?', 'I am working on a new project and want to ensure I follow best practices for database design. What are the key principles I should keep in mind?', 'dbms', '["database", "design", "best-practices"]', 'demo_user', 'John Doe', NOW(), 15, 2, 8, 156),

('post_2', 'Difference between TCP and UDP explained', 'Can someone explain the key differences between TCP and UDP protocols? When should I use each one?', 'networking', '["tcp", "udp", "protocols"]', 'demo_user2', 'Jane Smith', NOW(), 23, 1, 12, 234),

('post_3', 'SQL JOIN types confusion', 'I am confused about the different types of JOINs in SQL. Can someone provide clear examples of INNER, LEFT, RIGHT, and FULL OUTER JOINs?', 'dbms', '["sql", "joins", "help"]', 'demo_user3', 'Mike Johnson', NOW(), 18, 0, 15, 189);

-- Sample user achievements
INSERT INTO achievements (id, title, description, icon, criteria, points) VALUES
('quiz_master', 'Quiz Master', 'Complete 10 quizzes with 80%+ score', 'trophy', '{"quizzes_completed": 10, "min_score": 80}', 100),
('study_streak_7', '7-Day Streak', 'Study for 7 consecutive days', 'fire', '{"consecutive_days": 7}', 50),
('knowledge_sharer', 'Knowledge Sharer', 'Post 5 helpful forum answers', 'star', '{"forum_posts": 5, "min_upvotes": 3}', 75),
('flashcard_master', 'Flashcard Master', 'Complete 100 flashcards', 'brain', '{"flashcards_completed": 100}', 60),
('networking_expert', 'Networking Expert', 'Score 90%+ on 5 networking quizzes', 'network', '{"subject": "networking", "quizzes": 5, "min_score": 90}', 150);
