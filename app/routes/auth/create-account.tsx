import { NavLink, Form, useActionData, redirect } from 'remix'
import { supabaseClient } from '~/utils/db.server'
import { commitSession, getSession } from '~/utils/session.server'

export const action = async ({ request }) => {
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const first_name = form.get('first_name')

  const {
    session: sessionData,
    user,
    error
  } = await supabaseClient.auth.signUp({
    email,
    password
  })
  if (sessionData) {
    const result = await supabaseClient
      .from('user_profile')
      .upsert({ id: user.id, first_name })
    console.log('result', result)
    const session = await getSession(request.headers.get('Cookie'))
    session.set('access_token', sessionData.access_token)
    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(session)
      }
    })
  }
  return { user, error }
}

// https://remix.run/guides/routing#index-routes
export default function CreateAccount() {
  const actionData = useActionData()
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <main>
        <h2>Remix Supabase - Create Account Page</h2>
        <Form
          className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
          method="post"
        >
          <label className="font-semibold text-xs" htmlFor="first_name">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <label className="font-semibold text-xs" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
          />
          <label className="font-semibold text-xs mt-3" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
          />
          <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
            Sign Up
          </button>
          <div className="flex mt-6 justify-center text-xs">
            <NavLink
              to="/auth/login"
              className="text-blue-400 hover:text-blue-500"
            >
              Login
            </NavLink>
          </div>
        </Form>
        <div>{actionData?.error ? actionData?.error?.message : null}</div>
      </main>
    </div>
  )
}
