# Technical Test  

## Tech Used  

- **Framework & UI**: Next.js, React, Tailwind CSS, shadcn/ui
- **Database & ORM**: PostgreSQL, Drizzle ORM, @vercel/postgres  
- **State Management**: Zustand, React Query  
- **Authentication**: NextAuth.js, @auth/drizzle-adapter  
- **tRPC**: @trpc/server, @trpc/react-query, @trpc/client  
- **Validation**: Zod, drizzle-zod  
- **Audio Processing**: wavesurfer.js

## Notes & Assumptions  

- This project follows a **Domain Driven Design** approach.  
- Since no `Normal Machine Output` audio clips were provided, the output matches the `Anomaly Machine Output`.  
- Placeholder options were added for `Suspected Reason` and `Action Required`.  
- The `Date` picker was mentioned in the requirements but wasn't in the `Figma design`, so I placed it next to the machine name filter.  
- Each sound clip has a **one-to-one relationship** with an anomaly.  
