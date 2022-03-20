### What is this?

A boiler plate that has following tech stack setup with login/logout/signup and dashboard

<img src="https://res.cloudinary.com/dcmzulhgd/image/upload/v1641809256/obsidian/v38mxky6j5odalgs5sbt.png" width="300">

<img src="https://res.cloudinary.com/dcmzulhgd/image/upload/v1641809312/obsidian/s9dzeagxfdodlohzle6w.png" width="300">

### Stack

- remix
- supabase - auth/orm
- prisma - manage db / migration /seeding
- tailwind - styling

### Setup Supabase

![](https://res.cloudinary.com/dcmzulhgd/image/upload/w_300/v1642214646/obsidian/cjrt71jirxenplwcmb3h.png)

- Create a Supabase database.

- disable check email in user sign up

<img src="https://res.cloudinary.com/dcmzulhgd/image/upload/v1641808450/obsidian/k3o5lak4le43z4suxh0n.png" width="300">

2. Go to settings
3. Go to "Database"
4. Scroll down to "Connection string" and take copy the PSQL url
5. Go to "API"
6. Copy the API anon key, and the URL

<img src="https://res.cloudinary.com/dcmzulhgd/image/upload/v1641808552/obsidian/f1itclpog1tro4rf49id.png" width="300">

### Local Setup

#### Install dependencies

```bash
pnpm  install
```

#### Rename ".env.sample" to ".env"

```env
SUPABASE_URL=YOUR API URL
SUPABASE_ANON_KEY=YOUR API ANON KEY
DATABASE_URL=YOUR PSQL connection url
```

#### Run Prisma Script

```bash
pnpx prisma migrate dev
pnpx prisma db seed
```

### Setup with Vercel

1. Publish to vercel
2. Go to vercel project settings
3. Go to "Environment Variables"
4. Create two Environment Variables:

SUPABASE_ANON_KEY is the API anon key

SUPABASE_URL Is the API url

<img src="https://res.cloudinary.com/dcmzulhgd/image/upload/v1641808949/obsidian/jy3zboeisizn6i2ncxuc.png" width="300">
