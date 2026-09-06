CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    -- Unique Constraint: Mỗi tài khoản chỉ liên kết với 1 email duy nhất
    email VARCHAR(255) NOT NULL UNIQUE,
    Upassword VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'MEMBER'
);
CREATE TABLE Classes(
    id SERIAL PRIMARY KEY,
    className VARCHAR(255) NOT NULL,
    classDescription TEXT,
    sDate DATE,
    eDate DATE,
    mentorId INT REFERENCES Users(id) ON DELETE SET NULL
);
CREATE TABLE ClassMembers(
    id SERIAL PRIMARY KEY, 
    classId INT NOT NULL REFERENCES Classes(id) ON DELETE CASCADE,
    memberId INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    joinedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    -- Unique Constraint: 1 Member không được thêm 2 lần vào cùng 1 Class
    CONSTRAINT uqClassMember UNIQUE (classId, memberId)
);
CREATE TABLE Lessons(
    id SERIAL PRIMARY KEY,
    classId INT NOT NULL REFERENCES Classes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    lessonOrder INT NOT NULL,
    createdBy INT NOT NULL REFERENCES Users(id) ON DELETE RESTRICT,
    -- Unique Constraint: Thứ tự bài học trong cùng 1 lớp không được trùng nhau
    CONSTRAINT uqClassOrder UNIQUE (classId, lessonOrder) 
);
CREATE TABLE LessonProgress(
    id SERIAL PRIMARY KEY, 
    lessonId INT NOT NULL REFERENCES Lessons(id) ON DELETE CASCADE,
    memberId INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    completedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    -- Unique Constraint: 1 Member chỉ được đánh dấu hoàn thành bài học 1 lần duy nhất
    CONSTRAINT uqLessonMember UNIQUE (lessonId, memberId) 
);
CREATE TABLE Assignments(
    id SERIAL PRIMARY KEY,
    classId INT NOT NULL REFERENCES Classes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    assignmentDescription TEXT,
    deadline TIMESTAMPTZ,
    maxScore NUMERIC(5, 2)
);
CREATE TABLE Submissions(
    id SERIAL PRIMARY KEY,
    assignmentId INT NOT NULL REFERENCES Assignments(id) ON DELETE CASCADE,
    memberId INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    content TEXT,
    repoUrl VARCHAR(500),
    submittedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    score NUMERIC(5, 2) DEFAULT NULL,
    feedback TEXT DEFAULT NULL,
    reviewedAt TIMESTAMPTZ DEFAULT NULL,
    -- Unique Constraint: Mỗi Member chỉ nộp 1 bài cho 1 Assignment
    CONSTRAINT uqAssignmentMember UNIQUE (assignmentId, memberId)
);
-- Index: Tối ưu hóa API lấy danh sách bài học theo thứ tự
CREATE INDEX indexLessonClassOrder ON Lessons(classId, lessonOrder);
-- Index: Tối ưu hóa API lấy danh sách thành viên trong lớp
CREATE INDEX indexClassMemberClass ON ClassMembers(classId);
-- Index: Tối ưu hóa API tính toán tiến độ học tập của từng học viên
CREATE INDEX indexLessonProgressMember ON LessonProgress(memberId);
-- Index: Tối ưu hóa API lấy danh sách bài nộp để Mentor chấm điểm
CREATE INDEX indexSubmissionsAssignment ON Submissions(assignmentId);