// Enhanced AI adapter with advanced features
interface AIResponse {
  message: string
  confidence: number
  sources?: string[]
  codeSnippet?: string
  diagram?: DiagramData
  hints?: string[]
  followUpQuestions?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  simplified?: string
}

interface SubjectResponse {
  message: string
  confidence: number
  sources: string[]
  videos?: string[]
  codeSnippet?: string
  diagram?: DiagramData
  hints?: string[]
  followUpQuestions?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  simplified?: string
}

interface DiagramData {
  type: 'erd' | 'network' | 'flowchart' | 'uml'
  title: string
  description: string
  mermaidCode: string
}

interface ConversationContext {
  subject: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  mode: 'core' | 'extended'
  previousTopics: string[]
  lastQuestion?: string
}

const allSubjectResponses: Record<string, Record<string, SubjectResponse>> = {
  dbms: {
    "database normalization": {
      message: "Database normalization is the process of structuring a database to reduce redundancy and improve data integrity. It involves organizing data into tables and establishing relationships between them through normal forms (1NF, 2NF, 3NF, BCNF). Each normal form has specific rules to eliminate different types of data redundancy and maintain consistency.",
      confidence: 0.95,
      sources: ["Database System Concepts by Silberschatz", "Fundamentals of Database Systems", "Byju's Normalization Guide", "Tutorialspoint Database Normalization"],
      videos: ["https://www.youtube.com/watch?v=xoTyrdT9SZI", "https://www.youtube.com/watch?v=UrYLYV7WSHM", "https://www.byjus.com/gate/database-normalization-in-dbms/", "https://www.youtube.com/watch?v=GFQaEYEc8_8"],
      codeSnippet: `-- Example: Converting to 3NF
-- Before: Student_Course (StudentID, StudentName, CourseID, CourseName, Instructor)
-- After: Separate tables with proper relationships

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    StudentName VARCHAR(100)
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    Instructor VARCHAR(100)
);

CREATE TABLE Enrollments (
    StudentID INT,
    CourseID INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);`,
      diagram: {
        type: 'erd',
        title: 'Student-Course ER Diagram',
        description: 'Entity-Relationship diagram showing normalized database structure',
        mermaidCode: `erDiagram
    STUDENTS ||--o{ ENROLLMENTS : enrolls
    COURSES ||--o{ ENROLLMENTS : contains
    STUDENTS {
        int StudentID PK
        string StudentName
    }
    COURSES {
        int CourseID PK
        string CourseName
        string Instructor
    }
    ENROLLMENTS {
        int StudentID FK
        int CourseID FK
    }`
      },
      hints: ["Think about functional dependencies", "Identify partial dependencies", "Check for transitive dependencies"],
      followUpQuestions: ["Can you show me an example of 2NF violation?", "What's the difference between 3NF and BCNF?", "How do you denormalize for performance?"],
      difficulty: 'intermediate',
      simplified: "Database normalization is like organizing your closet - you don't want to keep the same shirt in multiple drawers. It helps avoid repeating information and keeps your data clean and organized."
    },
    "acid properties": {
      message: "ACID properties ensure reliable database transactions: Atomicity (all operations succeed or none do), Consistency (database remains in valid state), Isolation (concurrent transactions don't interfere), and Durability (committed changes survive failures).",
      confidence: 0.98,
      sources: ["Transaction Processing"],
      videos: ["https://www.youtube.com/watch?v=pomxJOFVcQs"],
      codeSnippet: `-- Example: ACID in action with bank transfer
BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
    -- If any step fails, entire transaction rolls back
COMMIT;`,
      diagram: {
        type: 'flowchart',
        title: 'ACID Transaction Flow',
        description: 'Flowchart showing how ACID properties work together',
        mermaidCode: `flowchart TD
    A[Start Transaction] --> B[Execute Operations]
    B --> C{Check Constraints}
    C -->|Valid| D[Prepare Commit]
    C -->|Invalid| E[Rollback]
    D --> F[Write to Log]
    F --> G[Commit Changes]
    E --> H[Transaction Failed]
    G --> I[Transaction Success]`
      },
      hints: ["Remember A-C-I-D as All Changes In Database", "Think about bank transfers", "Consider what happens if power fails"],
      followUpQuestions: ["How does isolation prevent dirty reads?", "What's the difference between optimistic and pessimistic locking?", "Can you give a real-world example of ACID failure?"],
      difficulty: 'intermediate',
      simplified: "ACID is like baking a cake - either you get a perfect cake (all ingredients work together) or nothing at all. No half-baked messes!"
    },
    "sql joins": {
      message: "SQL joins combine rows from two or more tables based on related columns. INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right table (NULL if no match). RIGHT JOIN returns all rows from the right table plus matching rows from the left table. FULL OUTER JOIN returns all rows from both tables. CROSS JOIN returns the Cartesian product of both tables.",
      confidence: 0.96,
      sources: ["SQL Complete Reference", "Database Systems: The Complete Book", "Byju's SQL Joins Guide", "W3Schools SQL Tutorial", "SQLBolt Interactive Tutorial"],
      videos: ["https://www.youtube.com/watch?v=9yeOJ0ZMUYw", "https://www.youtube.com/watch?v=0FPOoQ-7sAE", "https://www.byjus.com/gate/sql-joins/", "https://www.youtube.com/watch?v=2HVMiPPuPIM"],
      codeSnippet: `-- Different JOIN types with examples
SELECT s.name, c.course_name
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id;

SELECT s.name, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;`,
      diagram: {
        type: 'uml',
        title: 'SQL JOIN Types Venn Diagram',
        description: 'Visual representation of different JOIN operations',
        mermaidCode: `graph TD
    subgraph "Table A"
        A1[Row A1]
        A2[Row A2]
        A3[Row A3]
    end
    subgraph "Table B"
        B1[Row B1]
        B2[Row B2]
        B4[Row B4]
    end
    A1 -->|"INNER JOIN"| C1[Matching Rows]
    B1 -->|"INNER JOIN"| C1
    A2 -->|"LEFT JOIN"| C2[All A + Matching B]
    B2 -->|"LEFT JOIN"| C2
    A3 -->|"LEFT JOIN"| C2
    B4 -->|"RIGHT JOIN"| C3[All B + Matching A]
    A2 -->|"RIGHT JOIN"| C3`
      },
      hints: ["INNER JOIN = intersection", "LEFT JOIN = all from left + matches", "RIGHT JOIN = all from right + matches"],
      followUpQuestions: ["When would you use a FULL OUTER JOIN?", "What's the difference between JOIN and WHERE clause filtering?", "How do you handle NULL values in JOINs?"],
      difficulty: 'beginner',
      simplified: "SQL JOINs are like combining puzzle pieces. INNER JOIN only takes pieces that fit perfectly, LEFT JOIN takes all pieces from the left box plus any that fit from the right box."
    },
    "indexing": {
      message: "Database indexing creates a data structure that improves the speed of data retrieval operations on a database table. Indexes work like a book's index - they provide pointers to the actual data location. Types include clustered indexes (reorders physical data), non-clustered indexes (separate structure with pointers), unique indexes, and composite indexes (multiple columns).",
      confidence: 0.94,
      sources: ["Database Performance Tuning", "High Performance MySQL", "Byju's Database Course", "GeeksforGeeks Database Indexing"],
      videos: ["https://www.youtube.com/watch?v=HubezKbFL7E", "https://www.youtube.com/watch?v=fsG1XaZEa78", "https://www.byjus.com/gate/database-indexing/"],
      codeSnippet: `-- Creating different types of indexes
CREATE INDEX idx_student_name ON students(name);
CREATE UNIQUE INDEX idx_student_email ON students(email);
CREATE INDEX idx_student_course ON students(course_id, year);

-- Query with index usage
SELECT * FROM students WHERE name = 'John';
-- This will use idx_student_name for faster retrieval`,
      hints: ["Think of index like a book's table of contents", "Too many indexes can slow down INSERT/UPDATE operations", "Use EXPLAIN to see if your query uses indexes"],
      followUpQuestions: ["What's the difference between clustered and non-clustered indexes?", "How do you know when to create an index?", "What are the downsides of having too many indexes?"],
      difficulty: 'intermediate',
      simplified: "Index is like a phone book - instead of reading every page to find a name, you can jump directly to the right page using the alphabetical index."
    },
    "transactions": {
      message: "A database transaction is a sequence of operations performed as a single logical unit of work. Transactions must be atomic (all or nothing), consistent (data remains valid), isolated (concurrent transactions don't interfere), and durable (changes persist after commit). Transactions can be committed (made permanent) or rolled back (undone).",
      confidence: 0.97,
      sources: ["Transaction Processing: Concepts and Techniques", "Database System Implementation"],
      videos: ["https://www.youtube.com/watch?v=pomxJOFVcQs"],
      codeSnippet: `-- Transaction example with error handling
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE account_id = 'ACC001';
UPDATE accounts SET balance = balance + 500 WHERE account_id = 'ACC002';

-- Check if both updates succeeded
IF @@ERROR = 0
    COMMIT TRANSACTION;
ELSE
    ROLLBACK TRANSACTION;`,
      hints: ["Use transactions for operations that must succeed or fail together", "Remember the ACID properties", "Always handle transaction errors properly"],
      followUpQuestions: ["What happens if a transaction is interrupted by system failure?", "How do deadlocks occur in transactions?", "What's the difference between implicit and explicit transactions?"],
      difficulty: 'intermediate',
      simplified: "A transaction is like buying something online - either your payment goes through AND you get the item, or nothing happens at all. No middle ground!"
    },
    "er model": {
      message: "Entity-Relationship (ER) model is a conceptual data model that describes the structure of a database. Entities are objects or concepts (like Student, Course), Attributes are properties of entities (like name, age), and Relationships describe how entities are related (like 'Student enrolls in Course'). ER diagrams visually represent these concepts using rectangles for entities, ovals for attributes, and diamonds for relationships.",
      confidence: 0.93,
      sources: ["Database Design and Development", "Conceptual Database Design"],
      videos: ["https://www.youtube.com/watch?v=QpdhBUYk7Kk"],
      codeSnippet: `-- Converting ER model to SQL tables
-- Entity: Student
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    email VARCHAR(100) UNIQUE
);

-- Entity: Course  
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    credits INT
);

-- Relationship: Student enrolls in Course (Many-to-Many)
CREATE TABLE Enrollments (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);`,
      hints: ["Identify entities first, then attributes, then relationships", "Consider cardinality: one-to-one, one-to-many, many-to-many", "Weak entities depend on strong entities for identification"],
      followUpQuestions: ["How do you handle many-to-many relationships?", "What's the difference between strong and weak entities?", "How do you convert ER diagrams to relational tables?"],
      difficulty: 'beginner',
      simplified: "ER model is like drawing a family tree - you have people (entities) with names and ages (attributes), and they have relationships like 'parent of' or 'married to'."
    }
  },
  networking: {
    "osi model": {
      message: "The OSI (Open Systems Interconnection) model is a 7-layer conceptual framework that standardizes network communication: Physical (cables, signals), Data Link (MAC addresses, switches), Network (IP addresses, routers), Transport (TCP/UDP, ports), Session (connection management), Presentation (data formatting), and Application (user interfaces).",
      confidence: 0.96,
      sources: ["Computer Networks by Tanenbaum", "Byju's OSI Model Guide", "Cisco Networking Academy", "GeeksforGeeks OSI Model"],
      videos: ["https://www.youtube.com/watch?v=vv4y_uOneC0", "https://www.youtube.com/watch?v=LANW3m7UgWs", "https://www.byjus.com/gate/osi-model/", "https://www.youtube.com/watch?v=3b_TAYtzuho"],
      codeSnippet: `# OSI Model Layer Functions
# Physical Layer: Bit transmission over physical medium
# Data Link Layer: Frame transmission with MAC addresses
# Network Layer: Packet routing with IP addresses
# Transport Layer: End-to-end communication (TCP/UDP)
# Session Layer: Dialog management between applications
# Presentation Layer: Data translation and encryption
# Application Layer: User interface and application services`,
      diagram: {
        type: 'network',
        title: 'OSI Model Layers',
        description: '7-layer OSI model with protocols and devices',
        mermaidCode: `graph TD
    subgraph "Application Layer"
        A[HTTP, FTP, SMTP]
    end
    subgraph "Presentation Layer"
        B[ASCII, JPEG, MPEG]
    end
    subgraph "Session Layer"
        C[NetBIOS, RPC]
    end
    subgraph "Transport Layer"
        D[TCP, UDP]
    end
    subgraph "Network Layer"
        E[IP, ICMP, OSPF]
    end
    subgraph "Data Link Layer"
        F[Ethernet, PPP, Switches]
    end
    subgraph "Physical Layer"
        G[Cables, Hubs, Repeaters]
    end
    A --> B --> C --> D --> E --> F --> G`
      },
      hints: ["Remember: Please Do Not Throw Sausage Pizza Away", "Physical layer deals with bits, Application with data", "Each layer adds/removes headers"],
      followUpQuestions: ["Which layer handles IP addresses?", "What's the difference between TCP and UDP?", "How does encapsulation work in OSI?"],
      difficulty: 'beginner',
      simplified: "OSI model is like sending a letter - you need an envelope (physical), address (network), stamps (transport), and the actual letter (application). Each layer adds its own 'packaging'."
    },
    "tcp vs udp": {
      message: "TCP (Transmission Control Protocol) is connection-oriented with 3-way handshake (SYN, SYN-ACK, ACK), reliable delivery with acknowledgments, error detection and correction, flow control, and ordered data delivery. UDP (User Datagram Protocol) is connectionless with no handshake, faster transmission, no delivery guarantees, no error recovery, and minimal overhead. TCP is used for HTTP, FTP, email, file transfers. UDP is used for DNS, streaming media, online gaming, and real-time applications where speed matters more than reliability.",
      confidence: 0.96,
      sources: ["Computer Networks by Tanenbaum", "TCP/IP Protocol Suite", "Byju's TCP vs UDP", "Cisco TCP/UDP Documentation"],
      videos: ["https://www.youtube.com/watch?v=Vdc8TCESIg8", "https://www.youtube.com/watch?v=uwoD5YsGACg", "https://www.byjus.com/gate/tcp-vs-udp/", "https://www.youtube.com/watch?v=1LYqtkgtSPU"],
      codeSnippet: `# TCP vs UDP Comparison
# TCP Connection Setup (3-way handshake):
# Client: SYN
# Server: SYN-ACK
# Client: ACK

# TCP Socket Programming Example:
import socket
tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
tcp_sock.connect(('127.0.0.1', 80))

# UDP Socket Programming Example:
udp_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_sock.sendto(b'Hello', ('127.0.0.1', 53))`,
      diagram: {
        type: 'flowchart',
        title: 'TCP vs UDP Decision Flow',
        description: 'When to choose TCP or UDP',
        mermaidCode: `flowchart TD
    A[Need reliable delivery?] -->|Yes| B[TCP]
    A -->|No| C[Need speed over reliability?]
    C -->|Yes| D[UDP]
    C -->|No| E[Consider both protocols]
    B --> F[Web browsing, Email, File transfer]
    D --> G[Video streaming, Gaming, DNS]
    E --> H[Application-specific choice]`
      },
      hints: ["TCP = reliable but slow, UDP = fast but unreliable", "TCP has handshakes, UDP doesn't", "TCP for data integrity, UDP for speed"],
      followUpQuestions: ["When would you use both TCP and UDP in the same application?", "How does TCP handle packet loss?", "What's TCP congestion control?"],
      difficulty: 'intermediate',
      simplified: "TCP is like registered mail - it costs more but you know it will arrive safely. UDP is like regular mail - faster and cheaper but might get lost."
    },
    "subnetting": {
      message: "Subnetting divides a large network into smaller subnetworks to improve performance, security, and management. CIDR notation (/24) indicates network bits. IP address = Network portion + Host portion. Subnet mask determines the split.",
      confidence: 0.93,
      sources: ["Network Design"],
      videos: ["https://www.youtube.com/watch?v=s_Ntt6eTn94"],
      codeSnippet: `# Subnetting Example: 192.168.1.0/24
# Network: 192.168.1.0
# Broadcast: 192.168.1.255
# Host range: 192.168.1.1 - 192.168.1.254
# Total hosts: 256 - 2 = 254

# Calculate subnets for /26 (64 hosts per subnet):
# 192.168.1.0/26: 192.168.1.0 - 192.168.1.63
# 192.168.1.64/26: 192.168.1.64 - 192.168.1.127
# 192.168.1.128/26: 192.168.1.128 - 192.168.1.191
# 192.168.1.192/26: 192.168.1.192 - 192.168.1.255`,
      diagram: {
        type: 'network',
        title: 'Subnetting Example',
        description: 'Visual representation of IP address division',
        mermaidCode: `graph TD
    subgraph "192.168.1.0/24 Network"
        A[192.168.1.0/26<br/>Hosts: 0-63]
        B[192.168.1.64/26<br/>Hosts: 64-127]
        C[192.168.1.128/26<br/>Hosts: 128-191]
        D[192.168.1.192/26<br/>Hosts: 192-255]
    end
    A --> E[Network: 192.168.1.0<br/>Broadcast: 192.168.1.63]
    B --> F[Network: 192.168.1.64<br/>Broadcast: 192.168.1.127]
    C --> G[Network: 192.168.1.128<br/>Broadcast: 192.168.1.191]
    D --> H[Network: 192.168.1.192<br/>Broadcast: 192.168.1.255]`
      },
      hints: ["Network bits borrowed from host bits", "/24 = 256 hosts, /25 = 128 hosts", "First IP = network, last IP = broadcast"],
      followUpQuestions: ["How do you calculate the number of subnets?", "What's VLSM (Variable Length Subnet Mask)?", "How does subnetting improve security?"],
      difficulty: 'intermediate',
      simplified: "Subnetting is like dividing a pizza - instead of one big pizza for everyone, you cut it into smaller slices for different groups. Each slice (subnet) gets its own address range."
    },
    "routing protocols": {
      message: "Routing protocols determine the best path for data packets across networks. Distance Vector protocols (RIP, EIGRP) share routing tables with neighbors. Link State protocols (OSPF, IS-IS) maintain complete network topology. Path Vector protocols (BGP) are used between autonomous systems. OSPF uses Dijkstra's algorithm and supports areas for scalability. BGP is the protocol that makes the internet work by connecting different ISPs and organizations.",
      confidence: 0.91,
      sources: ["Routing TCP/IP Volume 1", "Internet Routing Architectures"],
      videos: ["https://www.youtube.com/watch?v=A1nRQNNmUiI"],
      codeSnippet: `# OSPF Configuration Example
router ospf 1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.255.255.255 area 1

# BGP Configuration Example  
router bgp 65001
 neighbor 203.0.113.2 remote-as 65002
 network 192.168.1.0 mask 255.255.255.0`,
      hints: ["Distance vector uses Bellman-Ford algorithm", "Link state protocols converge faster", "BGP uses path attributes for route selection"],
      followUpQuestions: ["What's the difference between interior and exterior gateway protocols?", "How does OSPF handle link state changes?", "Why is BGP called a path vector protocol?"],
      difficulty: 'hard',
      simplified: "Routing protocols are like GPS systems for the internet - they help data find the best route from source to destination, just like GPS finds the best route for your car."
    },
    "dns": {
      message: "Domain Name System (DNS) translates human-readable domain names into IP addresses. DNS hierarchy includes root servers, TLD servers (.com, .org), authoritative name servers, and recursive resolvers. DNS resolution process: 1) Check local cache, 2) Query recursive resolver, 3) Query root servers, 4) Query TLD servers, 5) Query authoritative servers. DNS records include A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), NS (name server), and PTR (reverse lookup).",
      confidence: 0.94,
      sources: ["DNS and BIND", "Internet Core Protocols"],
      videos: ["https://www.youtube.com/watch?v=mpQZVYPuDGU"],
      codeSnippet: `# DNS Resolution Example Commands
nslookup google.com
dig google.com A
dig google.com MX
dig -x 8.8.8.8  # Reverse DNS lookup

# DNS Record Types
A     192.168.1.1         # IPv4 address
AAAA  2001:db8::1         # IPv6 address  
CNAME www.example.com     # Canonical name
MX    mail.example.com    # Mail exchange
NS    ns1.example.com     # Name server`,
      hints: ["DNS uses both TCP (zone transfers) and UDP (queries)", "TTL determines how long records are cached", "DNS is hierarchical and distributed"],
      followUpQuestions: ["What happens when DNS cache is poisoned?", "How does DNS load balancing work?", "What's the difference between authoritative and recursive DNS servers?"],
      difficulty: 'intermediate',
      simplified: "DNS is like a phone book for the internet - when you type 'google.com', DNS looks up the actual numerical address (like 172.217.164.110) so your computer knows where to connect."
    },
    "network security": {
      message: "Network security protects data during transmission and prevents unauthorized access. Key concepts include firewalls (packet filtering, stateful inspection), VPNs (encryption tunnels), IDS/IPS (intrusion detection/prevention), SSL/TLS (secure communication), and access control lists (ACLs). Common attacks include DDoS, man-in-the-middle, packet sniffing, and SQL injection. Defense strategies use layered security, encryption, authentication, and monitoring.",
      confidence: 0.89,
      sources: ["Network Security Essentials", "Cryptography and Network Security"],
      videos: ["https://www.youtube.com/watch?v=kBzbKUirOFk"],
      codeSnippet: `# Firewall Rules Example (iptables)
# Allow HTTP traffic
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Block specific IP
iptables -A INPUT -s 192.168.1.100 -j DROP

# Allow SSH from specific network
iptables -A INPUT -p tcp -s 10.0.0.0/8 --dport 22 -j ACCEPT

# VPN Configuration Example
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward`,
      hints: ["Defense in depth uses multiple security layers", "Encryption protects data confidentiality", "Always use strong authentication methods"],
      followUpQuestions: ["How do firewalls differ from intrusion detection systems?", "What's the difference between symmetric and asymmetric encryption?", "How does a VPN protect your data?"],
      difficulty: 'intermediate',
      simplified: "Network security is like having locks, alarms, and guards for your house - firewalls are the locks, IDS are the alarms, and administrators are the guards protecting your data."
    },
    "concurrency control": {
      message: "Concurrency control manages simultaneous database operations to maintain data consistency. Techniques include locking (shared/exclusive locks), timestamp ordering, optimistic concurrency control, and multiversion concurrency control (MVCC). Problems addressed: lost updates, dirty reads, non-repeatable reads, and phantom reads. Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
      confidence: 0.91,
      sources: ["Database System Concepts", "Concurrency Control and Recovery", "Byju's DBMS Concurrency", "Transaction Processing"],
      videos: ["https://www.youtube.com/watch?v=onYjxRcToto", "https://www.youtube.com/watch?v=W9EMSKRtFDY", "https://www.byjus.com/gate/concurrency-control-in-dbms/"],
      codeSnippet: `-- Example of concurrency control with locks
BEGIN TRANSACTION;
LOCK TABLE accounts IN EXCLUSIVE MODE;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;  -- Releases locks`,
      hints: ["Locks prevent data inconsistency", "Higher isolation = lower concurrency", "Choose appropriate isolation level for your use case"],
      followUpQuestions: ["What's the difference between optimistic and pessimistic locking?", "How does MVCC work in PostgreSQL?", "What causes deadlocks and how to prevent them?"],
      difficulty: 'hard',
      simplified: "Concurrency control is like traffic lights at intersections - they make sure cars (transactions) don't crash into each other when accessing the same road (data)."
    },
    "query optimization": {
      message: "Query optimization improves database query performance through cost-based optimization, query rewriting, index utilization, join order optimization, and statistics analysis. The optimizer estimates execution costs and chooses the most efficient plan. Techniques include using EXPLAIN plans, proper indexing, avoiding SELECT *, optimizing WHERE clauses, and query restructuring.",
      confidence: 0.93,
      sources: ["Database Performance Tuning", "Query Optimization Techniques", "Byju's SQL Optimization", "High Performance MySQL"],
      videos: ["https://www.youtube.com/watch?v=BHwzDmr6d7s", "https://www.youtube.com/watch?v=VuPKYZsqJa4", "https://www.byjus.com/gate/query-optimization-in-dbms/"],
      codeSnippet: `-- Query optimization examples
-- Inefficient query
SELECT * FROM students s, courses c, enrollments e 
WHERE s.id = e.student_id AND c.id = e.course_id;

-- Optimized query with proper joins and specific columns
SELECT s.name, c.course_name, e.grade
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON c.id = e.course_id
WHERE s.active = 1 AND c.active = 1;

-- Use EXPLAIN to see execution plan
EXPLAIN SELECT * FROM students WHERE name = 'John';`,
      hints: ["Use EXPLAIN to understand query execution", "Indexes speed up WHERE, JOIN, and ORDER BY", "Avoid functions in WHERE clauses"],
      followUpQuestions: ["How does the cost-based optimizer work?", "What's the difference between hash joins and nested loop joins?", "When should you use query hints?"],
      difficulty: 'advanced',
      simplified: "Query optimization is like finding the fastest route to school - the database looks at all possible paths and chooses the quickest one."
    }
  },
  dsa: {
    "sorting algorithms": {
      message: "Sorting algorithms arrange data in order. Common types: Bubble Sort (O(n²)), Quick Sort (O(n log n) average), Merge Sort (O(n log n) guaranteed), and Heap Sort (O(n log n)).",
      confidence: 0.97,
      sources: ["Algorithms Textbook"],
      videos: ["https://www.youtube.com/watch?v=kPRA0W1kECg"]
    },
    "binary search": {
      message: "Binary search efficiently finds elements in sorted arrays with O(log n) time complexity by repeatedly dividing the search space in half.",
      confidence: 0.96,
      sources: ["Data Structures"],
      videos: ["https://www.youtube.com/watch?v=P3YID7liBug"]
    }
  },
  web: {
    "javascript closures": {
      message: "Closures allow inner functions to access outer function variables even after the outer function returns. They're fundamental for data privacy and callback functions.",
      confidence: 0.94,
      sources: ["JavaScript Guide"],
      videos: ["https://www.youtube.com/watch?v=3a0I8ICR1Vg"]
    },
    "react lifecycle": {
      message: "React component lifecycle includes mounting (componentDidMount), updating (componentDidUpdate), and unmounting (componentWillUnmount) phases. Hooks like useEffect manage these in functional components.",
      confidence: 0.95,
      sources: ["React Documentation"],
      videos: ["https://www.youtube.com/watch?v=Oioo0IdoEls"]
    }
  },
  dm: {
    "graph theory": {
      message: "Graph theory studies mathematical structures called graphs, consisting of vertices (nodes) connected by edges. Used in network analysis, shortest path algorithms, and social networks.",
      confidence: 0.93,
      sources: ["Discrete Mathematics"],
      videos: ["https://www.youtube.com/watch?v=09_LlHjoEiY"]
    }
  },
  tc: {
    "technical writing": {
      message: "Technical writing communicates complex information clearly and concisely. Key principles: know your audience, use clear structure, avoid jargon, and include examples.",
      confidence: 0.90,
      sources: ["Technical Communication Guide"]
    }
  },
  dld: {
    "boolean algebra": {
      message: "Boolean algebra is a mathematical system for logic operations using binary values (0,1). Key operations: AND, OR, NOT. De Morgan's laws: !(A∧B) = !A∨!B and !(A∨B) = !A∧!B.",
      confidence: 0.95,
      sources: ["Digital Logic Design"]
    }
  },
  signals: {
    "fourier transforms": {
      message: "Fourier transforms convert signals from time domain to frequency domain, revealing frequency components. Essential for signal analysis, filtering, and compression.",
      confidence: 0.92,
      sources: ["Signal Processing"]
    }
  }
}

// Global conversation context
let conversationContext: ConversationContext = {
  subject: 'dbms',
  difficulty: 'intermediate',
  mode: 'core',
  previousTopics: []
}

export async function getAIResponse(
  query: string,
  subject: string,
  extendedMode: boolean = false,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate',
  requestSimplified: boolean = false
): Promise<AIResponse> {
  const normalizedQuery = query.toLowerCase()
  const subjectResponses = allSubjectResponses[subject] || {}

  // Update conversation context
  conversationContext.subject = subject
  conversationContext.difficulty = difficulty
  conversationContext.mode = extendedMode ? 'extended' : 'core'

  // Check for difficulty adjustment requests
  if (normalizedQuery.includes('beginner') || normalizedQuery.includes('simple') || normalizedQuery.includes('easy')) {
    conversationContext.difficulty = 'beginner'
  } else if (normalizedQuery.includes('advanced') || normalizedQuery.includes('expert') || normalizedQuery.includes('complex')) {
    conversationContext.difficulty = 'advanced'
  }

  // Check for "explain like I'm 5" requests
  const wantsSimplified = requestSimplified || normalizedQuery.includes('explain like i\'m 5') ||
                         normalizedQuery.includes('eli5') || normalizedQuery.includes('simple terms')

  // Simple keyword matching
  for (const [key, response] of Object.entries(subjectResponses)) {
    if (normalizedQuery.includes(key)) {
      // Add to previous topics for context
      if (!conversationContext.previousTopics.includes(key)) {
        conversationContext.previousTopics.push(key)
        if (conversationContext.previousTopics.length > 5) {
          conversationContext.previousTopics.shift() // Keep only last 5 topics
        }
      }

      let enhancedMessage = response.message

      // Adjust difficulty level
      if (conversationContext.difficulty === 'beginner' && response.difficulty === 'advanced') {
        enhancedMessage = response.simplified || response.message
      } else if (conversationContext.difficulty === 'advanced' && response.difficulty === 'beginner') {
        enhancedMessage += "\n\n**🔬 Advanced Perspective:** This concept has deeper implications in real-world systems and optimization."
      }

      // Handle "Explain Like I'm 5" requests
      if (wantsSimplified && response.simplified) {
        enhancedMessage = response.simplified
      }

      if (extendedMode) {
        enhancedMessage += "\n\n**🎓 Extended Learning:**\nThis topic connects to broader computer science concepts and industry applications."

        // Add code snippet if available
        if (response.codeSnippet) {
          enhancedMessage += `\n\n**💻 Code Example:**\n\`\`\`sql\n${response.codeSnippet}\n\`\`\``
        }

        // Add hints for practice questions
        if (response.hints && response.hints.length > 0) {
          enhancedMessage += "\n\n**💡 Practice Hints:**\n" + response.hints.map(hint => `• ${hint}`).join('\n')
        }

        // Add follow-up questions for deeper learning
        if (response.followUpQuestions && response.followUpQuestions.length > 0) {
          enhancedMessage += "\n\n**🤔 Follow-up Questions:**\n" + response.followUpQuestions.map(q => `• ${q}`).join('\n')
        }

        if (response.videos && response.videos.length > 0) {
          enhancedMessage += `\n\n**📺 Recommended Videos:**\n${response.videos.map(video => `• ${video}`).join('\n')}`
        }

        enhancedMessage += "\n\n**💡 Study Tips:**\n• Practice with real examples\n• Connect concepts to practical applications\n• Review related topics for comprehensive understanding"
      } else {
        // Core notes - keep it concise
        const sentences = response.message.split('.').filter(s => s.trim().length > 0)
        enhancedMessage = sentences.slice(0, 2).join('. ') + '.'
      }

      return {
        message: enhancedMessage,
        confidence: response.confidence,
        sources: response.sources,
        codeSnippet: extendedMode ? response.codeSnippet : undefined,
        diagram: extendedMode ? response.diagram : undefined,
        hints: extendedMode ? response.hints : undefined,
        followUpQuestions: extendedMode ? response.followUpQuestions : undefined,
        difficulty: response.difficulty,
        simplified: wantsSimplified ? response.simplified : undefined
      }
    }
  }

  // Context-aware default response
  let defaultMessage
  if (extendedMode) {
    const contextTopics = conversationContext.previousTopics.length > 0
      ? ` Based on our previous discussion about ${conversationContext.previousTopics.join(', ')}, `
      : ''

    defaultMessage = `I understand you're asking about ${subject.toUpperCase()}.${contextTopics} Let me provide comprehensive guidance:\n\n**🎯 Core Concepts:** This subject covers fundamental principles that are essential for your academic and professional growth.\n\n**📚 Study Approach:** Break down complex topics into smaller concepts, practice regularly, and connect theory to practical applications.\n\n**🔗 Extended Resources:** In extended mode, I can provide YouTube tutorials, reference materials, and detailed explanations for deeper learning.`

    if (conversationContext.difficulty === 'beginner') {
      defaultMessage += "\n\n**👶 Beginner Mode:** I'll explain concepts in simple terms with practical examples."
    } else if (conversationContext.difficulty === 'advanced') {
      defaultMessage += "\n\n**🔬 Advanced Mode:** I'll include technical details, optimizations, and industry applications."
    }
  } else {
    defaultMessage = `I understand you're asking about ${subject.toUpperCase()}. Please rephrase your question or ask about specific topics for a focused answer.`
  }

  return {
    message: defaultMessage,
    confidence: 0.5,
    sources: [],
    difficulty: conversationContext.difficulty
  }
}

export async function generateFlashcards(
  content: string,
  subject: string,
): Promise<Array<{ question: string; answer: string }>> {
  // Dummy flashcard generation based on content keywords
  const flashcards = []

  if (subject === "dbms") {
    flashcards.push(
      {
        question: "What is a primary key?",
        answer: "A primary key is a unique identifier for each record in a database table.",
      },
      {
        question: "Define foreign key",
        answer: "A foreign key is a field that links to the primary key of another table, establishing relationships.",
      },
      {
        question: "What is SQL?",
        answer: "SQL (Structured Query Language) is used to communicate with and manipulate databases.",
      },
    )
  } else if (subject === "networking") {
    flashcards.push(
      {
        question: "What is a router?",
        answer: "A router is a device that forwards data packets between computer networks.",
      },
      {
        question: "Define bandwidth",
        answer: "Bandwidth is the maximum rate of data transfer across a network connection.",
      },
      { question: "What is DNS?", answer: "DNS (Domain Name System) translates domain names to IP addresses." },
    )
  }

  return flashcards
}
