import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  //create a trigger to add a new row into user_profile automatically for new user signup
  // await db.$queryRaw`
  //   create table user_profile (
  //     id UUID,
  //   );`
  await db.$queryRaw`
    create or replace function public.handle_new_user()
            returns trigger as $$
            begin
            insert into public.user_profile (id)
            values (new.id);
            return new;
            end;
            $$ language plpgsql security definer;
            create trigger on_auth_user_created
            after insert on auth.users
            for each row execute procedure public.handle_new_user();`
}

seed()
