import { createClient } from '@supabase/supabase-js'
import { getSession } from './session.server'
import dotenv from 'dotenv'
dotenv.config()
// see documention about using .env variables
// https://remix.run/docs/en/v1/guides/envvars#server-environment-variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
export const supabaseClient = createClient(supabaseUrl, supabaseKey)
export const hasAuthSession = async (request) => {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.has('access_token')) return { error: Error('No session') }
  const { user, error: sessionErr } = await supabaseClient.auth.api.getUser(
    session.get('access_token')
  )
  if (sessionErr) {
    return { error: sessionErr }
  }
  supabaseClient.auth.setAuth(session.get('access_token'))
  return { user }
}
