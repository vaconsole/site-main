import { useLoaderData, redirect, Form, Link } from 'remix'
import { supabaseClient, hasAuthSession } from '~/utils/db.server'

export const loader = async ({ request }) => {
  const { user } = await hasAuthSession(request)
  const { data, error } = await supabaseClient
    .from('user_profile')
    .select('first_name')
    .eq('id', user.id)
    .single()
  return { data, error, user }
}

export const action = async ({ request }) => {
  const { user } = await hasAuthSession(request)
  if (!user) {
    return redirect(`/auth/login`)
  }
  const formData = await request.formData()
  const result = await supabaseClient
    .from('user_profile')
    .upsert({ id: user.id, first_name: formData.get('first_name') })
  return redirect(`/dashboard/profile`)
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { data, error, user } = useLoaderData()
  return (
    <div className="remix__page">
      <main>
        <div className="flex flex-1 items-center flex-col my-4 ">
          <h2 className="font-bold text-2xl">Welcome to Remix Supabase App</h2>
          <h4> {user?.email}</h4>
        </div>
        <div className="flex flex-1 items-center flex-row my-4 ">
          <Form method="post">
            <label htmlFor="first_name: ">first_name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              className="border-2"
              defaultValue={data?.first_name}
            ></input>
            <button type="submit" className="border-2">
              edit first name
            </button>
          </Form>
        </div>
        <div className="flex flex-1 items-center flex-row my-4 ">
          <Form method="post"></Form>
        </div>
        <div>{error ? error?.message : null}</div>
      </main>
    </div>
  )
}
