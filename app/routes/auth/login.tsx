import { Form, useActionData, redirect, NavLink } from 'remix'
import { supabaseClient } from '~/utils/db.server'
import { commitSession, getSession } from '~/utils/session.server'

export const action = async ({ request }) => {
  // get user credentials from form
  const form = await request.formData()
  const email = form.get('email')
  const password = form.get('password')
  const { user, session, error } = await supabaseClient.auth.signIn({
    email,
    password
  })
  if (session) {
    const currentSession = await getSession(request.headers.get('Cookie'))
    currentSession.set('access_token', session.access_token)
    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(currentSession)
      }
    })
  }
  return { user, error }
}

// https://remix.run/api/conventions#meta
export const meta = () => {
  return {
    title: 'Remix Supabase Starter',
    description: 'Welcome to remix! Login Page'
  }
}

export default function Login() {
  const actionData = useActionData()

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">Welcome Back :)</h1>
      <Form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        method="post"
      >
        <label className="font-semibold text-xs" htmlFor="usernameField">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <input
          id="password"
          name="password"
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
        />
        <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">
          Login
        </button>
        <div>{actionData?.error ? actionData?.error?.message : null}</div>
        <div className="flex mt-6 justify-center text-xs">
          <NavLink
            to="/auth/create-account"
            className="text-blue-400 hover:text-blue-500"
          >
            Sign Up
          </NavLink>
        </div>
      </Form>
    </div>
  )
}
