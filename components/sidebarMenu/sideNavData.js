import {
    AppstoreOutlined,
    SettingOutlined,
    HomeOutlined,
    ReadOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    ScheduleOutlined
} from "@ant-design/icons";


const adminSidebarData = [

    {
        title: "Dashboard",
        subtitle: [
            { title: 'Admin', link: 'admin/view-all/viewAdmin' },
            { title: 'librarian', link: 'admin/view-all/librarian' },
            { title: 'View All Library', link: 'admin/view-all/view-all' }],
        icon: AppstoreOutlined
    },
    {
        title: "Library",
        subtitle: [
            { title: 'Add library', link: 'admin/library/registration' },
            { title: 'Set Librarian', link: 'admin/library/assign-librarian' },
            { title: 'Make Admin', link: 'admin/library/make-admin' },],
        icon: ReadOutlined
    }
];


const LibrarianSidebarData = [
    {
        title: "Library",
        subtitle: [
            { title: 'Add Books', link: 'librarian/books/add-books' },
            { title: 'View Books', link: 'librarian/books/view-books' },
            { title: 'Add Online Books', link: 'librarian/online-books/addOnlineBook' },
            { title: 'View Online Books List', link: 'librarian/online-books/view-online-books' },
        ],
        icon: AppstoreOutlined
    },
    {
        title: "Teacher",
        subtitle: [{ title: 'Add', link: 'librarian/teacher/add' }, { title: 'View All', link: 'librarian/teacher/view-all' }],
        icon: ReadOutlined
    },
    {
        title: "Member",
        subtitle: [{ title: 'Add', link: 'librarian/member/add' }, { title: 'View All', link: 'librarian/member/view-all' }],
        icon: TeamOutlined
    },
    {
        title: "Booking",
        subtitle: [{ title: 'Currently Book', link: 'librarian/booking/currentlybookFolder/currently-book' }, { title: 'Booking Pending', link: 'librarian/booking/pendingFolder/pending' }, { title: 'Received by Member', link: 'librarian/booking/receiveFolder/receive' }],
        icon: TeamOutlined
    },
    {
        title: "About",
        subtitle: [{ title: 'About Library', link: 'librarian/about/about' }],
        icon: SafetyCertificateOutlined
    },
];



const TeacherSidebarData = [
    {
        title: "Library",
        subtitle: [{ title: 'Get Books', link: 'teacher/get-books' }, { title: 'View Online Books', link: 'teacher/online-books' }],
        icon: AppstoreOutlined
    },
    {
        title: "Member",
        subtitle: [{ title: 'View All', link: 'teacher/member/view-all' }],
        icon: TeamOutlined
    },
    {
        title: "About",
        subtitle: [{ title: 'About Library', link: 'teacher/about' }],
        icon: SafetyCertificateOutlined
    },
];


const MemberSidebarData = [
    {
        title: "Library",
        subtitle: [{ title: 'Get Books', link: 'member/get-books' }, { title: 'View Online Books', link: 'member/online-books' }, { title: 'View Booking', link: 'member/booking' }],
        icon: AppstoreOutlined
    },
    {
        title: "About",
        subtitle: [{ title: 'About Library', link: 'member/about' }],
        icon: SafetyCertificateOutlined
    },
];



export {
    adminSidebarData,
    LibrarianSidebarData,
    TeacherSidebarData,
    MemberSidebarData
};