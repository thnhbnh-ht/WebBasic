create type UserRole as enum ('ADMIN', 'MEMBER');
create table Users (
    id serial primary key,
    email varchar(255) not null unique,
    matkhau varchar(255) not null,
    role UserRole not null default 'MEMBER'
);
create table Classes (
    id serial primary key,
    ten varchar(255) not null,
    mota text,
    sDate date,
    eDate date,
    mentorId int references Users(id) on delete set null
);
create table ClassMembers (
    id serial primary key,
    classId int not null references Classes(id) on delete cascade,
    memberId int not null references Users(id) on delete cascade,
    joinedAt timestamptz default current_timestamp,
    constraint uqClassMember unique (classId, memberId)
);
create table Lessons (
    id serial primary key,
    classId int not null references Classes(id) on delete cascade,
    title varchar(255) not null,
    content text,
    "order" int not null,
    createdBy int not null references Users(id) on delete restrict,
    constraint uqClassOrder unique (classId, "order")
);
create table LessonProgress (
    id serial primary key,
    lessonId int not null references Lessons(id) on delete cascade,
    memberId int not null references Users(id) on delete cascade,
    completedAt timestamptz default current_timestamp,
    constraint uqLessonMember unique (lessonId, memberId)
);
create table Assignments (
    id serial primary key,
    classId int not null references Classes(id) on delete cascade,
    title varchar(255) not null,
    mota text,
    deadline timestamptz,
    maxScore numeric(5, 2)
);
create table Submissions (
    id serial primary key,
    assignmentId int not null references Assignments(id) on delete cascade,
    memberId int not null references Users(id) on delete cascade,
    content text,
    repoUrl varchar(500),
    submittedAt timestamptz default current_timestamp,
    score numeric(5, 2) default null,
    feedback text default null,
    reviewedAt timestamptz default null,
    constraint uqAssignmentMember unique (assignmentId, memberId)
);
create index indexLessonClassOrder on Lessons(classId, "order");
create index indexClassMemberClass on ClassMembers(classId);
create index indexLessonProgressMember on LessonProgress(memberId);
create index indexSubmissionsAssignment on Submissions(assignmentId);