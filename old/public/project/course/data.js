var CourseData = {
    "courses": [{
            "id": 0,
            "name": "CSE 8A",
            "title": "Introduction to Computer Science: Java I",
            "des": "Introductory course for students interested in computer science. Fundamental concepts of applied computer science using media computation. Exercises in the theory and practice of computer science. Hands-on experience with designing, editing, compiling, and executing programming constructs and applications. CSE 8A is part of a two-course sequence (CSE 8A and CSE 8B) that is equivalent to CSE 11. Students should take CSE 8B to complete this track. Formerly offered as corequisite courses CSE 8A plus 8AL. Students who have taken CSE 8B or CSE 11 may not take CSE 8A.",
            "unit": 4,
            "equivalence": [
                { "course": 2 }
            ]
        }, {
            "id": 1,
            "name": "CSE 8B",
            "title": "Introduction to Computer Science: Java II",
            "des": "Continuation of the Java language. Continuation of programming techniques. More on inheritance. Exception handling. CSE 8B is part of a two-course sequence (CSE 8A and CSE 8B) that is equivalent to CSE 11. Students should consult the CSE Course Placement Advice web page for assistance in choosing which CSE course to take first. Students may not receive credit for CSE 8B and CSE 11. ",
            "unit": 4,
            "prerequisites": [
                { "course": 0 }
            ],
            "equivalence": [
                { "course": 2 }
            ]
        }, {
            "id": 2,
            "name": "CSE 11",
            "title": "Introduction to Computer Science and Object-Oriented Programming: Java",
            "des": "An accelerated introduction to computer science and programming using the Java language. Basic UNIX. Modularity and abstraction. Documentation, testing and verification techniques. Basic object-oriented programming, including inheritance and dynamic binding. Exception handling. Event-driven programming. Experience with AWT library or other similar library. Students who have completed CSE 8B may not take CSE 11. Students should consult the CSE Course Placement Advice web page for assistance in choosing which CSE course to take first. ",
            "unit": 4,
            "quarter": 0,
            "equivalence": [
                { "course": 0 },
                { "course": 1 }
            ]
        }, {
            "id": 3,
            "name": "CSE 12",
            "title": "Basic Data Structures and Object-Oriented Design",
            "des": "Use and implementation of basic data structures including linked lists, stacks, and queues. Use of advanced structures such as binary trees and hash tables. Object-oriented design including interfaces, polymorphism, encapsulation, abstract data types, pre-/post-conditions. Recursion. Uses Java and Java Collections. ",
            "unit": 4,
            "quarter": 1,
            "prerequisites": [
                { "relation": 0 }
            ],
            "corequisites": [
                { "course": 4 }
            ]
        }, {
            "id": 4,
            "name": "CSE 15L",
            "title": "Software Tools and Techniques Laboratory",
            "des": "Hands-on exploration of software development tools and techniques. Investigation of the scientific process as applied to software development and debugging. Emphasis is on weekly hands-on laboratory experiences, development of laboratory notebooking techniques as applied to software design. ",
            "unit": 2,
            "quarter": 1,
            "prerequisites": [
                { "relation": 0 }
            ],
            "corequisites": [
                { "course": 3 }
            ]
        }, {
            "id": 5,
            "name": "CSE 20",
            "title": "Discrete Mathematics",
            "des": "Basic discrete mathematical structures: sets, relations, functions, sequences, equivalence relations, partial orders, and number systems. Methods of reasoning and proofs: prepositional logic, predicate logic, induction, recursion, and pigeonhole principle. Infinite sets and diagonalization. Basic counting techniques; permutation and combinations. Applications will be given to digital logic design, elementary number theory, design of programs, and proofs of program correctness. Credit not offered for both Math 15A and CSE 20. Equivalent to Math 15A. ",
            "unit": 4,
            "quarter": 1,
            "prerequisites": [
                { "relation": 1 }
            ]
        }, {
            "id": 6,
            "name": "CSE 21",
            "title": "Mathematics for Algorithms and Systems",
            "des": "This course will provide an introduction to the discrete mathematical tools needed to analyze algorithms and systems. Enumerative combinatorics: basic counting principles, inclusion-exclusion, and generating functions. Matrix notation. Applied discrete probability. Finite automata. Credit not offered for both Math 15B and CSE 21.",
            "unit": 4,
            "quarter": 2,
            "prerequisites": [
                { "course": 5 },
            ]
        }, {
            "id": 7,
            "name": "CSE 30",
            "title": "Introduction to Computer Science: Java I",
            "des": "Introduction to organization of modern digital computers—understanding the various components of a computer and their interrelationships. Study of a specific architecture/machine with emphasis on systems programming in C and Assembly languages in a UNIX environment. ",
            "unit": 4,
            "quarter": 2,
            "prerequisites": [
                { "course": 3 },
                { "course": 4 }
            ]
        }, {
            "id": 8,
            "name": "CSE 80",
            "title": "UNIX Lab",
            "des": "The objective of the course is to help the programmer create a productive UNIX environment. Topics include customizing the shell, file system, shell programming, process management, and UNIX tools. ",
            "unit": 2,
            "prerequisites": [
                { "relation": 0 }
            ]
        }, {
            "id": 9,
            "name": "CSE 86",
            "title": "C++ for Java Programmers",
            "des": "Helps the Java programmer to be productive in the C++ programming environment. Topics include the similarities and differences between Java and C++ with special attention to pointers, operator overloading, templates, the STL, the preprocessor, and the C++ Runtime Environment. ",
            "unit": 2,
            "prerequisites": [
                { "course": 3 }
            ]
        }, {
            "id": 10,
            "name": "CSE 100",
            "title": "Advanced Data Structures",
            "des": "High-performance data structures and supporting algorithms. Use and implementation of data structures like (un)balanced trees, graphs, priority queues, and hash tables. Also memory management, pointers, recursion. Theoretical and practical performance analysis, both average case and amortized. Uses C++ and STL. Credit not offered for both Math 176 and CSE 100. Equivalent to Math 176. Recommended preparation: background in C or C++ programming. ",
            "unit": 4,
            "quarter": 3,
            "prerequisites": [
                { "course": 3 },
                { "course": 4 },
                { "course": 6 },
                { "course": 7 }
            ]
        }, {
            "id": 11,
            "name": "CSE 101",
            "title": "Design and Analysis of Algorithms",
            "des": "Design and analysis of efficient algorithms with emphasis of nonnumerical algorithms such as sorting, searching, pattern matching, and graph and network algorithms. Measuring complexity of algorithms, time and storage. NP-complete problems. Credit not offered for both Math 188 and CSE 101. Equivalent to Math 188. ",
            "unit": 4,
            "prerequisites": [
                { "course": 3 },
                { "course": 6 },
                { "course": 10 }
            ]
        }, {
            "id": 12,
            "name": "CSE 103",
            "title": "A Practical Introduction to Probability and Statistics",
            "des": "Distributions over the real line. Independence, expectation, conditional expectation, mean, variance. Hypothesis testing. Learning classifiers. Distributions over R^n, covariance matrix. Binomial, Poisson distributions. Chernoff bound. Entropy. Compression. Arithmetic coding. Maximal likelihood estimation. Bayesian estimation. CSE 103 is not duplicate credit for ECE 109, Econ 120A, or Math 183. ",
            "unit": 4,
            "prerequisites": [
                { "course": 48 },
                { "course": 49 }
            ]
        }, {
            "id": 13,
            "name": "CSE 105",
            "title": "Theory of Computability",
            "des": "An introduction to the mathematical theory of computability. Formal languages. Finite automata and regular expression. Push-down automata and context-free languages. Computable or recursive functions: Turing machines, the halting problem. Undecidability. Credit not offered for both Math 166 and CSE 105. Equivalent to Math 166. ",
            "unit": 4,
            "quarter": 3,
            "prerequisites": [
                { "course": 3 },
                { "course": 6 }
            ]
        }, {
            "id": 14,
            "name": "CSE 107",
            "title": "Introduction to Modern Cryptography",
            "des" : "Topics include private and public-key cryptography, block ciphers, data encryption, authentication, key distribution and certification, pseudorandom number generators, design and analysis of protocols, zero-knowledge proofs, and advanced protocols. Emphasizes rigorous mathematical approach including formal definitions of security goals and proofs of protocol security. ",
            "unit": 4,
            "prerequisites": [
                { "course": 6 },
                { "course": 11 },
                { "course": 13 }
            ]
        }, {
            "id": 15,
            "name": "CSE 110",
            "title": "Software Engineering",
            "des": "Introduction to software development and engineering methods, including specification, design, implementation, testing, and process. An emphasis on team development, agile methods, and use of tools such as IDE’s, version control, and test harnesses. CSE 70 is renumbered to CSE 110: students may not receive credit for both CSE 70 and CSE 110. ",
            "unit": 4,
            "prerequisites": [
                { "course": 3 },
                { "course": 6 }
            ]
        }, {
            "id": 16,
            "name": "CSE 120",
            "title": "Principles of Computer Operating Systems",
            "des": "Basic functions of operating systems; basic kernel structure, concurrency, memory management, virtual memory, file systems, process scheduling, security and protection. ",
            "unit": 4,
            "prerequisites": [
                { "course": 7 },
                { "course": 11 },
                { "course": 15 }
            ]
        }, {
            "id": 17,
            "name": "CSE 121",
            "title": "Operating Systems: Architecture and Implementation",
            "des": "(Formerly CSE 171B.) Case study of architecture and implementation of a selected modern operating system. In-depth analysis through a detailed study of source code. Topics include process creation, context-switching, memory allocation, synchronization mechanisms, interprocess communication, I/O buffering, device drivers, and file systems. ",
            "unit": 4,
            "prerequisites": [
                { "course": 16 }
            ]
        }, {
            "id": 18,
            "name": "CSE 123",
            "title": "Computer Networks",
            "des": "(Renumbered from CSE 123A.) Introduction to concepts, principles, and practice of computer communication networks with examples from existing architectures, protocols, and standards with special emphasis on the Internet protocols. Layering and the OSI model; physical and data link layers; local and wide area networks; datagrams and virtual circuits; routing and congestion control; internetworking. Transport protocols. Credit may not be received for both CSE 123 and ECE 158A, or CSE 123A and CSE 123.",
            "unit": 4,
            "prerequisites": [
                { "course": 16 }
            ]
        }, {
            "id": 19,
            "name": "CSE 124",
            "title": "Networked Services",
            "des": "(Renumbered from CSE 123B.) The architecture of modern networked services, including data center design, enterprise storage, fault tolerance, and load balancing. Protocol software structuring, the Transmission Control Protocol (TCP), remote procedure calls, protocols for digital audio and video communication, overlay and peer-to-peer systems, secure communication. Credit may not be received for both CSE 124 and ECE 158B. Students may not receive credit for both CSE 123B and CSE 124. ",
            "unit": 4,
            "prerequisites": [
                { "course": 16 }
            ]
        }, {
            "id": 20,
            "name": "CSE 127",
            "title": "Introduction to Computer Security",
            "des": "Topics include basic cryptography, security/threat analysis, access control, auditing, security models, distributed systems security, and theory behind common attack and defense techniques. The class will go over formal models as well as the bits and bytes of security exploits. ",
            "unit": 4,
            "prerequisites": [
                { "course": 6 },
                { "course": 16 }
            ]
        }, {
            "id": 21,
            "name": "CSE 130",
            "title": "Programming Languages: Principles and Paradigms",
            "des" : "(Formerly CSE 173.) Introduction to programming languages and paradigms, the components that comprise them, and the principles of language design, all through the analysis and comparison of a variety of languages (e.g., Pascal, Ada, C++, PROLOG, ML.) Will involve programming in most languages studied. ",
            "unit": 4,
            "prerequisites": [
                { "course": 3 },
                { "course": 10 },
                { "course": 13 }
            ]
        }, {
            "id": 22,
            "name": "CSE 131",
            "title": "Compiler Construction",
            "des": "(Formerly CSE 131B.) Introduction to the compilation of programming languages, practice of lexical and syntactic analysis, symbol tables, syntax-directed translation, type checking, code generation, optimization, interpretation, and compiler structure. (Students may receive repeat credit for CSE 131A and CSE 131B by completing CSE 131.) ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 },
                { "course": 13 },
                { "course": 15 },
                { "course": 21 }
            ]
        }, {
            "id": 23,
            "name": "CSE 132A",
            "title": "Compiler Construction",
            "des": "Basic concepts of databases, including data modeling, relational databases, query languages, optimization, dependencies, schema design, and concurrency control. Exposure to one or several commercial database systems. Advanced topics such as deductive and object-oriented databases, time allowing. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 24,
            "name": "CSE 132B",
            "title": "Database Systems Applications",
            "des": "Design of databases, transactions, use of trigger facilities and datablades. Performance measuring, organization of index structures. ",
            "unit": 4,
            "prerequisites": [
                { "course": 23 }
            ]
        }, {
            "id": 25,
            "name": "CSE 134B",
            "title": "Web Client Languages",
            "des": "Design and implementation of interactive World Wide Web clients using helper applications and plug-ins. The main language covered will be Java. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 26,
            "name": "CSE 135",
            "title": "Server-side Web Applications",
            "des": "Design and implementation of dynamic web-based applications. Multitier architecture, scripting languages, SQL, XML, session handling, nonbrowser clients, web services, and scalability, security, and usability in the web context. Credit is not offered for both CSE 135 and CSE 134A. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 27,
            "name": "CSE 140",
            "title": "Components and Design Techniques for Digital Systems",
            "des": "(Formerly CSE 170A) Design of Boolean logic and finite state machines; two-level, multilevel combinational logic design, combinational modules and modular networks, Mealy and Moore machines, analysis and synthesis of canonical forms, sequential modules. ",
            "unit": 4,
            "prerequisites": [
                { "course": 5 }
            ],
            "corequisites": [
                { "course": 28 }
            ]
        }, {
            "id": 28,
            "name": "CSE 140L",
            "title": "Digital Systems Laboratory",
            "des": "Implementation with computer-aided design tools for combinational logic minimization and state machine synthesis. Hardware construction of a small digital system. ",
            "unit": 2,
            "prerequisites": [
                { "course": 5 }
            ],
            "corequisites": [
                { "course": 27 }
            ]
        }, {
            "id": 29,
            "name": "CSE 141",
            "title": "Introduction to Computer Architecture",
            "des": "Introduction to computer architecture. Computer system design. Processor design. Control design. Memory systems. ",
            "unit": 4,
            "prerequisites": [
                { "course": 27 },
                { "course": 28 }
            ],
            "corequisites": [
                { "course": 30 }
            ]
        }, {
            "id": 30,
            "name": "CSE 141L",
            "title": "Project in Computer Architecture",
            "des": "Hands-on computer architecture project aiming to familiarize students with instruction set architecture, and design of process. Control and memory systems. ",
            "unit": 4,
            "prerequisites": [
                { "course": 27 },
                { "course": 28 }
            ],
            "corequisites": [
                { "course": 29 }
            ]
        }, {
            "id": 31,
            "name": "CSE 143",
            "title": "Microelectronic System Design",
            "des": "VSLI process technologies; circuit characterization; logic design styles; clocking strategies; computer-aided design tools; subsystem design; design case studies. System design project from hardware description, logic synthesis, physical layout to design verification. ",
            "unit": 4,
            "prerequisites": [
                { "course": 27 }
            ]
        }, {
            "id": 32,
            "name": "CSE 144",
            "title": "Computer-Aided Design of VLSI Circuits",
            "des": "Introduction to computer-aided design. Placement, assignment and floor planning techniques. Routing. Symbolic layout and compaction. Module generation and silicon compilation. ",
            "unit": 4,
            "prerequisites": [
                { "course": 27 },
                { "course": 28 }
            ]
        }, {
            "id": 33,
            "name": "CSE 145",
            "title": "Embedded System Design Project",
            "des": "Project class building an embedded computing system. Learn fundamental knowledge of microcontrollers, sensors, and actuators. Introduction to the hardware and software tools to build project in a team environment and end-to-end system building. ",
            "unit": 4,
            "prerequisites": [
                { "course": 7 }
            ]
        }, {
            "id": 34,
            "name": "CSE 148",
            "title": "Advanced Processor Architecture Design Project",
            "des": "Students will use hardware description language tools to add advanced architectural features to a basic processor design. These features may include pipelining, superscalar execution, branch prediction, and advanced cache features. Designs will be implemented in programmable logic devices. ",
            "unit": 4,
            "prerequisites": [
                { "course": 29 },
                { "course": 30 }
            ]
        }, {
            "id": 35,
            "name": "CSE 150",
            "title": "Introduction to Artificial Intelligence: Search and Reasoning",
            "des" : "Search algorithms including BFS, DFS, iterative deepening and A*, randomized search algorithms including Walksat, syntax and semantics of first-order logic (FOL), knowledge representation in FOL including reasoning, basic reasoning with probabilities, basic Bayesian learning. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 36,
            "name": "CSE 151",
            "title": "Introduction to Artificial Intelligence: Statistical Approaches",
            "des": "Reasoning with probabilities, reasoning and learning with Bayesian networks, decision making under uncertainty, sequential decision making, statistical learning methods, and reinforcement learning. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 37,
            "name": "CSE 152",
            "title": "Introduction to Computer Vision",
            "des": "The goal of computer vision is to compute scene and object properties from images and video. This introductory course includes feature detection, image segmentation, motion estimation, object recognition, and 3-D shape reconstruction through stereo, photometric stereo, and structure from motion. ",
            "unit": 4,
            "prerequisites": [
                { "course": 47 },
                { "course": 10 },
                { "course": 11 }
            ]
        }, {
            "id": 38,
            "name": "CSE 153",
            "title": "Cognitive Modeling",
            "des": "Construction of computational models that “do the same things people do,” in terms of perception, categorization, memory, language, action, etc. and typically in a fashion that is plausibly carried out by the neural networks in our brains. The model must fit behavioral, neurophysiological, and/or neuropsychological data. Recommended preparation: background knowledge in computer science, cognitive science, psychology, or neuroscience, and a basic understanding of the most fundamental concepts of differential calculus, linear algebra, and statistics. Computer programming skills may be useful to some students as they conduct their term projects, but such skills are not required. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 39,
            "name": "CSE 160",
            "title": "Introduction to Parallel Computing",
            "des": "Introduction to high performance parallel computing: parallel architecture, algorithms, software, and problem-solving techniques. Areas covered: Flynns’ taxonomy, processor-memory organizations, shared and nonshared memory models: message passing and multithreading, data parallelism; speedup, efficiency and Amdahl’s law, communication and synchronization, isoefficiency and scalability. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 40,
            "name": "CSE 164",
            "title": "GPU Programming",
            "des" : "Principles and practices of programming graphics processing units (GPUs). GPU architecture and hardware concepts, including memory and threading models. Modern hardware-accelerated graphics pipeline programming. Application of GPU programming to rendering of game graphics, including physical, deferring, and global lighting models. Recommended preparation: Practical Rendering and Computation with Direct3D 11 by Jason Zink, Matt Pettineo, and Jack Hoxley. ",
            "unit": 4,
            "prerequisites": [
                { "course": 43 }
            ]
        }, {
            "id": 41,
            "name": "CSE 165",
            "title": "3D User Interaction",
            "des": "This course focuses on design and evaluation of three-dimensional (3D) user interfaces, devices, and interaction techniques. The course consists of lectures, literature reviews, and programming assignments. Students will be expected to create interaction techniques for several different 3D interaction devices. Program or material fee may apply. ",
            "unit": 4,
            "prerequisites": [
                { "course": 43 }
            ]
        }, {
            "id": 42,
            "name": "CSE 166",
            "title": "Image Processing",
            "des": "Principles of image formation, analysis, and representation. Image enhancement, restoration, and segmentation; stochastic image models. Filter design, sampling, Fourier and wavelet transforms. Selected applications in computer graphics and machine vision. ",
            "unit": 4,
            "prerequisites": [
                { "course": 47 },
                { "course": 10 }
            ]
        }, {
            "id": 43,
            "name": "CSE 167",
            "title": "Computer Graphics",
            "des": "Representation and manipulation of pictorial data. Two-dimensional and three-dimensional transformations, curves, surfaces. Projection, illumination, and shading models. Raster and vector graphic I/O devices; retained-mode and immediate-mode graphics software systems and applications. Students may not receive credit for both Math 155A and CSE 167. ",
            "unit": 4,
            "prerequisites": [
                { "course": 10 }
            ]
        }, {
            "id": 44,
            "name": "CSE 168",
            "title": "Computer Graphics II: Rendering",
            "des": "Weekly programming assignments that will cover graphics rendering algorithms. During the course the students will learn about ray tracing, geometry, tessellation, acceleration structures, sampling, filtering, shading models, and advanced topics such as global illumination and programmable graphics hardware. ",
            "unit": 4,
            "prerequisites": [
                { "course": 43 }
            ]
        }, {
            "id": 45,
            "name": "CSE 169",
            "title": "Computer Animation",
            "des": "Advanced graphics focusing on the programming techniques involved in computer animation. Algorithms and approaches for both character animation and physically based animation. Particular subjects may include skeletons, skinning, key framing, facial animation, inverse kinematics, locomotion, motion capture, video game animation, particle systems, rigid bodies, clothing, and hair. Recommended preparation: An understanding of linear algebra. ",
            "unit": 4,
            "prerequisites": [
                { "course": 43 }
            ]
        }, {
            "id": 46,
            "name": "CSE 170",
            "title": "Introduction to Human-Computer Interaction Design",
            "des": "Introduces fundamental methods and principles for designing, implementing, and evaluating user interfaces. Topics: user-centered design, rapid prototyping, experimentation, direct manipulation, cognitive principles, visual design, social software, software tools. Learn by doing: Work with a team on a quarter-long design project. Cross-listed with COGS 120. Recommended preparation: Basic familiarity with HTML",
            "unit": 4,
            "prerequisites": [
                { "relation": 2 }
            ]
        }, {
            "id": 47,
            "name": "MATH 18",
            "title": "Linear Algebra",
            "unit": 4,
            "des": "Matrix algebra, Gaussian elimination, determinants. Linear and affine subspaces, bases of Euclidean spaces. Eigenvalues and eigenvectors, quadratic forms, orthogonal matrices, diagonalization of symmetric matrices. Applications. Computing symbolic and graphical solutions using Matlab. Students may not receive credit for both Math 18 and 31AH. ",
            "prerequisites": [
                { "course": 48 }
            ]
        }, {
            "id": 48,
            "name": "MATH 20A",
            "title": "Calculus for Science and Engineering",
            "unit": 4,
            "quarter": 0,
            "des": "Foundations of differential and integral calculus of one variable. Functions, graphs, continuity, limits, derivative, tangent line. Applications with algebraic, exponential, logarithmic, and trigonometric functions. Introduction to the integral. (Two credits given if taken after Math 1A/10A and no credit given if taken after Math 1B/10B or Math 1C/10C.",
        }, {
            "id": 49,
            "name": "MATH 20B",
            "title": "Calculus for Science and Engineering",
            "unit": 4,
            "quarter": 1,
            "des": "Integral calculus of one variable and its applications, with exponential, logarithmic, hyperbolic, and trigonometric functions. Methods of integration. Infinite series. Polar coordinates in the plane and complex exponentials.",
            "prerequisites": [
                { "course": 48 }
            ]
        }, {
            "id": 50,
            "name": "MATH 20C",
            "title": "Calculus and Analytic Geometry for Science and Engineering ",
            "unit": 4,
            "quarter": 2,
            "des": "Vector geometry, vector functions and their derivatives. Partial differentiation. Maxima and minima. Double integration. ",
            "prerequisites": [
                { "course": 49 }
            ]
        }, {
            "id": 51,
            "name": "MATH 20D",
            "title": "Introduction to Differential Equations",
            "unit": 4,
            "des": "Ordinary differential equations: exact, separable, and linear; constant coefficients, undetermined coefficients, variations of parameters. Systems. Series solutions. Laplace transforms. Techniques for engineering sciences. Computing symbolic and graphical solutions using Matlab. ",
            "prerequisites": [
                { "course": 50 }
            ]
        }, {
            "id": 52,
            "name": "MATH 20E",
            "title": "Vector Calculus",
            "unit": 4,
            "des": "Change of variable in multiple integrals, Jacobian, Line integrals, Green’s theorem. Vector fields, gradient fields, divergence, curl. Spherical/cylindrical coordinates. Taylor series in several variables. Surface integrals, Stoke’s theorem. Gauss’ theorem. Conservative fields. ",
            "prerequisites": [
                { "course": 50 }
            ]
        }
    ],
    "relations": [
        {
            "id": 0,
            "type": "OR",
            "name": "CSE 8B or CSE 11",
            "courses": [ 1, 2 ]
        },
        {
            "id": 1,
            "type": "OR",
            "name": "CSE 8A or CSE 8B or CSE 11",
            "courses": [ 0, 1, 2 ]
        },
        {
            "id": 2,
            "type": "OR",
            "name": "CSE 11 or CSE 8A",
            "courses": [ 0, 2 ]
        }
    ]
}
