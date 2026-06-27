# EduSphere — Documentation

This folder contains all project documentation assets.

## Structure

```
docs/
├── diagrams/
│   ├── mermaid/        ← Export PNG files from mermaid.live here
│   │   ├── EduSphere_ERD_Database_Schema.png
│   │   ├── EduSphere_Sequence_Auth_Upload.png
│   │   ├── EduSphere_Component_Hierarchy.png
│   │   └── EduSphere_State_Navigation_Flow.png
│   │
│   └── uml/            ← Export PNG files from draw.io here
│       ├── EduSphere_Use_Case.png
│       ├── EduSphere_Class_Diagram.png
│       ├── EduSphere_Activity_Register.png
│       ├── EduSphere_Activity_Upload.png
│       └── EduSphere_Component_Diagram.png
│
└── wireframes/         ← Export screens from Stitch/Figma here
    ├── 01_Landing_Page.png
    ├── 02_Auth_Register.png
    ├── 03_Auth_Login.png
    ├── 04_Home_Dashboard.png
    ├── 05_Study_Groups.png
    ├── 06_Resources.png
    ├── 07_Campus_Map.png
    └── 08_Profile.png
```

## SRS Document

The full Software Requirements Specification (SRS) is maintained separately in:
```
EduSphere-Documentation/01_PRD_EduSphere.docx
```

## How to update diagrams

1. Edit the Mermaid source at `mermaid.live`
2. Export as PNG
3. Replace the file in `/docs/diagrams/mermaid/`
4. Re-insert into the `.docx` using Insert → Picture → replace image
