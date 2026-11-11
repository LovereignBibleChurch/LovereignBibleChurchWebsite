// Content for the /policy page (Lovereign Bible Church Mobile Application Privacy Policy).
// Edit the text here; the page layout picks up changes automatically.

export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[]; columns?: boolean }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
  | { type: "link"; label: string; href: string }
  | { type: "contact" }

export interface PolicySubsection {
  id: string
  number: string
  title: string
  blocks: PolicyBlock[]
}

export interface PolicySection {
  id: string
  number: string
  title: string
  blocks: PolicyBlock[]
  subsections?: PolicySubsection[]
}

export const policyMeta = {
  title: "Privacy Policy",
  appName: "Lovereign Bible Church Mobile Application",
  effectiveDate: "11 November 2026",
  lastUpdated: "11 November 2026",
  closingLine: "Committed to protecting your privacy while providing a secure and connected digital church experience.",
}

export const policyContact = {
  organisation: "Lovereign Bible Church",
  office: "Central Administrative Directorate",
  website: "https://lovereignbiblechurch.org",
  email: "info@lovereignbiblechurch.org",
  phone: "(+233) 24 237 1411",
  phoneHref: "tel:+233242371411",
  address: "Dome Pillar Two Road, Christian Village, Achimota",
  // Set to the designated officer's name or office to display it on the page.
  dataProtectionSupervisor: "" as string,
}

export const policyHighlights = [
  { title: "We never sell your data", text: "Your personal information is not sold, rented, or traded to third parties." },
  { title: "Role-based access", text: "Only authorised church personnel can see information needed for their responsibilities." },
  { title: "You stay in control", text: "You can request access to, correction of, or deletion of your personal information." },
]

export const policySections: PolicySection[] = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    blocks: [
      { type: "p", text: "Lovereign Bible Church (“LBC”, “the Church”, “we”, “our”, or “us”) is committed to protecting the privacy and personal information of its members, visitors, ministers, workers, and other individuals who use our mobile application (the “App”)." },
      { type: "p", text: "This Privacy Policy explains how we collect, use, store, disclose, and protect personal information when you access or use the Lovereign Bible Church Mobile Application." },
      { type: "p", text: "The App provides a digital platform through which users can access church services, watch live and recorded messages, communicate with other members, read Christian books, listen to music, access examination records, participate in church activities, and submit outreach reports." },
      { type: "p", text: "By using the App, you acknowledge that you have read and understood this Privacy Policy." },
      { type: "note", text: "Our handling of personal information is guided by applicable data protection laws, including the Data Protection Act, 2012 (Act 843) of Ghana." },
    ],
  },
  {
    id: "information-we-collect",
    number: "2",
    title: "Information We Collect",
    blocks: [
      { type: "p", text: "We collect information necessary to provide, maintain, and improve the services available through the App." },
      { type: "p", text: "Depending on the features you use, the following categories of information may be collected." },
    ],
    subsections: [
      {
        id: "personal-account-information",
        number: "2.1",
        title: "Personal and Account Information",
        blocks: [
          { type: "p", text: "When you register or use an account, we may collect:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Full name.",
              "Email address.",
              "Phone number.",
              "Profile photograph.",
              "Username and account credentials.",
              "Gender and date of birth, where applicable.",
              "Church branch or assembly.",
              "Membership status and ministry or departmental affiliation.",
              "User role, such as member, worker, minister, administrator, or branch pastor.",
            ],
          },
        ],
      },
      {
        id: "communication-chat-information",
        number: "2.2",
        title: "Communication and Chat Information",
        blocks: [
          { type: "p", text: "When you use the messaging and communication features, we may collect and process:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Messages exchanged through private and group chats.",
              "Message attachments, including images and documents.",
              "Sender and recipient information.",
              "Message timestamps and delivery information.",
              "Group membership and participation information.",
            ],
          },
          { type: "p", text: "This information is used to facilitate communication, maintain the functionality of the messaging service, prevent misuse, and support the administration of the platform." },
          { type: "note", text: "Users should avoid sharing sensitive personal, financial, or confidential information through chat unless necessary and appropriate." },
        ],
      },
      {
        id: "streaming-media-information",
        number: "2.3",
        title: "Streaming and Media Information",
        blocks: [
          { type: "p", text: "When you access live broadcasts, recorded sermons, audio messages, music, or other media content, we may collect:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Streaming and playback activity.",
              "Content accessed or viewed.",
              "Viewing and listening history.",
              "Playback duration and interaction information.",
              "Technical information relating to streaming performance.",
            ],
          },
          { type: "p", text: "This information helps us provide media services, improve content delivery, and understand how users interact with church resources." },
        ],
      },
      {
        id: "books-reading-information",
        number: "2.4",
        title: "Books and Digital Reading Information",
        blocks: [
          { type: "p", text: "The App provides access to digital books, publications, study materials, and other reading resources." },
          { type: "p", text: "We may collect:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Books and publications accessed.",
              "Reading progress and bookmarks, where supported.",
              "Download activity, where applicable.",
              "Reading preferences and interactions.",
            ],
          },
          { type: "p", text: "This information helps maintain reading progress and improve the digital library experience." },
        ],
      },
      {
        id: "examination-academic-records",
        number: "2.5",
        title: "Examination and Academic Records",
        blocks: [
          { type: "p", text: "Where the examination feature is available, authorised users may access examination-related information." },
          { type: "p", text: "This may include:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Examination registration details.",
              "Examination schedules.",
              "Examination participation records.",
              "Scores and results.",
              "Assessment records.",
              "Performance history.",
              "Relevant class, course, or programme information.",
            ],
          },
          { type: "p", text: "Examination records are treated as confidential and are accessible only to authorised users based on their assigned roles and permissions." },
          { type: "note", text: "We do not intend to make individual examination results publicly available without appropriate authorisation." },
        ],
      },
      {
        id: "outreach-evangelism-reports",
        number: "2.6",
        title: "Outreach and Evangelism Reports",
        blocks: [
          { type: "p", text: "The App allows authorised users, ministers, and church workers to submit reports relating to evangelism, outreach programmes, and other ministry activities." },
          { type: "p", text: "Information collected may include:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Name of the reporting individual.",
              "Church branch or ministry.",
              "Date and location of the outreach.",
              "Number of people reached.",
              "Number of new converts or first-time participants, where applicable.",
              "Outreach activities and observations.",
              "Testimonies and follow-up information.",
              "Photographs, documents, or other supporting attachments, where submitted.",
            ],
          },
          { type: "p", text: "This information is used for church administration, ministry evaluation, record keeping, reporting, and planning." },
          { type: "note", text: "Users submitting information about other individuals should ensure they have the necessary permission or other lawful basis to provide that information." },
        ],
      },
      {
        id: "device-technical-information",
        number: "2.7",
        title: "Device and Technical Information",
        blocks: [
          { type: "p", text: "To ensure the App functions properly, we may automatically collect certain technical information, including:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Device type and model.",
              "Operating system and version.",
              "App version.",
              "IP address.",
              "Device identifiers.",
              "Network information.",
              "Crash reports and diagnostic information.",
              "Login activity and timestamps.",
            ],
          },
          { type: "p", text: "Where applicable, push notification tokens may also be collected to deliver relevant announcements and updates." },
        ],
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    number: "3",
    title: "How We Use Your Information",
    blocks: [
      { type: "p", text: "We use collected information for legitimate church administration and service delivery purposes, including:" },
      {
        type: "ol",
        items: [
          "Creating, maintaining, and managing user accounts.",
          "Providing access to live church services and recorded messages.",
          "Facilitating private and group communication.",
          "Providing access to digital books, publications, and music.",
          "Managing examination schedules, assessments, and results.",
          "Collecting and managing outreach and evangelism reports.",
          "Maintaining church membership and organisational records.",
          "Communicating church announcements, events, and important updates.",
          "Managing user roles, permissions, and access to restricted information.",
          "Improving the App’s performance, reliability, and user experience.",
          "Detecting and preventing unauthorised access, fraud, abuse, and misuse.",
          "Meeting applicable legal and regulatory obligations.",
        ],
      },
      { type: "p", text: "We will not use personal information for purposes that are incompatible with the purposes for which it was collected without an appropriate lawful basis." },
    ],
  },
  {
    id: "how-we-share-your-information",
    number: "4",
    title: "How We Share Your Information",
    blocks: [
      { type: "note", text: "Lovereign Bible Church does not sell, rent, or trade users’ personal information to third parties." },
      { type: "p", text: "However, information may be shared in the following circumstances:" },
    ],
    subsections: [
      {
        id: "within-the-church",
        number: "4.1",
        title: "Within the Church",
        blocks: [
          { type: "p", text: "Information may be made available to authorised church leaders, administrators, pastors, departmental heads, examination administrators, and other designated personnel where necessary for their responsibilities." },
          { type: "p", text: "Access is intended to be restricted according to assigned roles and permissions. For example:" },
          {
            type: "ul",
            items: [
              "Branch pastors may access information relating to their respective branches.",
              "Examination administrators may access relevant examination records.",
              "Authorised ministry leaders may access relevant outreach reports.",
              "System administrators may manage user accounts and platform operations.",
            ],
          },
        ],
      },
      {
        id: "third-party-service-providers",
        number: "4.2",
        title: "Third-Party Service Providers",
        blocks: [
          { type: "p", text: "We may use trusted third-party service providers to operate and maintain the App." },
          { type: "p", text: "These may include providers responsible for:" },
          {
            type: "ul",
            columns: true,
            items: [
              "Cloud hosting and database infrastructure.",
              "Video and audio streaming.",
              "Media and document storage.",
              "Push notifications.",
              "Authentication and account management.",
              "App performance monitoring and diagnostics.",
            ],
          },
          { type: "p", text: "Such providers may process information on our behalf where necessary to provide their services. We expect appropriate confidentiality and data protection safeguards to be maintained." },
        ],
      },
      {
        id: "legal-regulatory-requirements",
        number: "4.3",
        title: "Legal and Regulatory Requirements",
        blocks: [
          { type: "p", text: "We may disclose personal information where required by applicable law, a lawful court order, or a competent regulatory authority." },
          { type: "p", text: "We may also disclose information where reasonably necessary to protect the rights, safety, and security of the Church, its members, or other individuals, subject to applicable law." },
        ],
      },
    ],
  },
  {
    id: "chat-user-content",
    number: "5",
    title: "Chat, User Content and Communication",
    blocks: [
      { type: "p", text: "The App may provide private messaging and group communication features." },
      { type: "p", text: "Users are responsible for the information and content they choose to share through these features. Please be aware that:" },
      {
        type: "ul",
        items: [
          "Messages are intended for their selected recipients or group participants.",
          "Group messages may be visible to all authorised members of the relevant group.",
          "Users should not share passwords, confidential records, or other highly sensitive information through chats.",
          "The Church may investigate reported messages or content where necessary to address abuse, misconduct, security concerns, or legal obligations.",
          "Access to messages by authorised administrators, where necessary, should be limited to legitimate administrative or safety purposes.",
        ],
      },
      { type: "p", text: "We encourage users to communicate respectfully and responsibly." },
    ],
  },
  {
    id: "children-and-minors",
    number: "6",
    title: "Children and Minors",
    blocks: [
      { type: "p", text: "Certain services and activities offered through the App may involve children and minors." },
      { type: "p", text: "Where personal information relating to a child is collected, we will take appropriate steps to ensure that such information is handled responsibly and in accordance with applicable data protection laws." },
      { type: "note", text: "Where required, parental or legal guardian consent will be obtained before collecting or processing a child’s personal information." },
      { type: "p", text: "Access to examination records, personal profiles, communication features, and other restricted services may be subject to additional safeguards." },
      { type: "p", text: "Parents and legal guardians who have concerns about information relating to a child may contact the Church through the contact details provided in this Policy." },
    ],
  },
  {
    id: "data-storage-and-retention",
    number: "7",
    title: "Data Storage and Retention",
    blocks: [
      { type: "p", text: "We retain personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, meet legitimate administrative requirements, resolve disputes, and comply with applicable legal obligations." },
      { type: "p", text: "Different categories of information may have different retention periods. For example:" },
      {
        type: "ul",
        items: [
          "Account information may be retained while an account remains active.",
          "Examination records may be retained according to applicable academic and administrative requirements.",
          "Outreach reports may be retained for church reporting, historical, and administrative purposes.",
          "Chat information may be retained according to operational and security requirements.",
          "Technical logs may be retained for a limited period for security and troubleshooting purposes.",
        ],
      },
      { type: "p", text: "When information is no longer required, we will take appropriate steps to delete, anonymise, or securely dispose of it, subject to applicable retention obligations." },
    ],
  },
  {
    id: "data-security",
    number: "8",
    title: "Data Security",
    blocks: [
      { type: "p", text: "We take reasonable technical and organisational measures to protect personal information against:" },
      {
        type: "ul",
        columns: true,
        items: [
          "Unauthorised access.",
          "Accidental loss or destruction.",
          "Unauthorised disclosure.",
          "Unlawful processing.",
          "Alteration or misuse.",
        ],
      },
      { type: "p", text: "These measures may include access controls, authentication mechanisms, role-based permissions, secure data transmission, and appropriate administrative safeguards." },
      { type: "p", text: "However, no electronic storage system or method of transmission over the internet can be guaranteed to be completely secure." },
      { type: "note", text: "Users are responsible for maintaining the confidentiality of their login credentials and should notify the Church if they suspect unauthorised access to their accounts." },
    ],
  },
  {
    id: "your-privacy-rights",
    number: "9",
    title: "Your Privacy Rights",
    blocks: [
      { type: "p", text: "Subject to applicable law, you may have the right to:" },
      {
        type: "ol",
        items: [
          "Request access to personal information held about you.",
          "Request correction of inaccurate or incomplete information.",
          "Request the deletion of personal information where legally permissible.",
          "Object to certain forms of personal data processing.",
          "Withdraw consent where processing is based on consent.",
          "Request information about how your personal information is being used.",
          "Raise concerns or lodge complaints regarding the handling of your personal information.",
        ],
      },
      { type: "p", text: "Certain information, including examination records, financial records, church administrative records, and other records subject to legitimate retention requirements, may not be immediately eligible for deletion." },
      { type: "p", text: "To exercise any of these rights, please contact the Church using the details provided below." },
    ],
  },
  {
    id: "third-party-links",
    number: "10",
    title: "Third-Party Links and Services",
    blocks: [
      { type: "p", text: "The App may contain links to external websites, streaming platforms, media services, or other third-party applications." },
      { type: "p", text: "These services may operate under their own privacy policies and terms of service." },
      { type: "p", text: "Lovereign Bible Church does not control the privacy practices of independent third-party platforms. We encourage users to review the applicable privacy policies before using those services." },
    ],
  },
  {
    id: "push-notifications",
    number: "11",
    title: "Push Notifications and Announcements",
    blocks: [
      { type: "p", text: "The App may send notifications relating to:" },
      {
        type: "ul",
        columns: true,
        items: [
          "Church announcements.",
          "Upcoming services and programmes.",
          "Live broadcasts.",
          "New sermons and publications.",
          "Examination schedules and results.",
          "Ministry and departmental activities.",
          "Other relevant church communications.",
        ],
      },
      { type: "p", text: "Users may manage notification permissions through their device settings, subject to the functionality of the App." },
    ],
  },
  {
    id: "international-data-processing",
    number: "12",
    title: "International Data Processing",
    blocks: [
      { type: "p", text: "Some of our technology and infrastructure providers may store or process information on servers located outside Ghana." },
      { type: "p", text: "Where personal information is transferred or processed internationally, we will take appropriate steps to ensure that such processing is handled in accordance with applicable data protection requirements." },
    ],
  },
  {
    id: "changes-to-this-policy",
    number: "13",
    title: "Changes to This Privacy Policy",
    blocks: [
      { type: "p", text: "Lovereign Bible Church reserves the right to update or modify this Privacy Policy as the App develops, new features are introduced, or applicable legal requirements change." },
      { type: "p", text: "Where significant changes are made, we may notify users through the App, our official website, or other appropriate communication channels." },
      { type: "p", text: "The updated version will indicate its effective or last updated date. We encourage users to review this Policy periodically." },
    ],
  },
  {
    id: "contact-information",
    number: "14",
    title: "Contact Information",
    blocks: [
      { type: "p", text: "If you have questions, concerns, requests, or complaints relating to this Privacy Policy or the handling of your personal information, please contact us through the following channels:" },
      { type: "contact" },
    ],
  },
  {
    id: "regulatory-compliance",
    number: "15",
    title: "Regulatory Compliance",
    blocks: [
      { type: "p", text: "This Privacy Policy is intended to support compliance with the Data Protection Act, 2012 (Act 843) of Ghana and other applicable data protection requirements." },
      { type: "p", text: "Individuals who believe that their personal information has been handled improperly may also contact the Ghana Data Protection Commission through its official website:" },
      { type: "link", label: "Ghana Data Protection Commission — dpc.gov.gh", href: "https://dpc.gov.gh/" },
    ],
  },
]
