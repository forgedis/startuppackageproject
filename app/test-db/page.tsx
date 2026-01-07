import { createClient } from '@/lib/supabase/server'

export default async function TestDBPage() {
  const supabase = await createClient()

  // Test connection
  let connectionStatus = 'Unknown'
  let error = null

  try {
    // Try to fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')

    if (categoriesError) {
      error = categoriesError
      connectionStatus = 'Error'
    } else {
      connectionStatus = 'Connected ✅'
    }

    // Try to fetch partners
    const { data: partners, error: partnersError } = await supabase
      .from('partners')
      .select('*')

    // Try to fetch offers
    const { data: offers, error: offersError } = await supabase
      .from('offers')
      .select('*')

    // Try to fetch leads
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">🔍 Database Connection Test</h1>

        {/* Connection Status */}
        <div className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Connection Status</h2>
          <p className="text-lg">
            <strong>Status:</strong>{' '}
            <span
              className={
                connectionStatus === 'Connected ✅'
                  ? 'text-green-600'
                  : 'text-red-600'
              }
            >
              {connectionStatus}
            </span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="mb-2 text-xl font-semibold text-red-900">❌ Error</h2>
            <pre className="overflow-auto text-sm text-red-800">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        {/* Tables Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">📊 Tables Summary</h2>

          {/* Categories */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Categories Table
              {categoriesError && (
                <span className="ml-2 text-sm text-red-600">
                  (Error: {categoriesError.message})
                </span>
              )}
            </h3>
            <p className="mb-4">
              <strong>Total records:</strong> {categories?.length || 0}
            </p>
            {categories && categories.length > 0 ? (
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Slug</th>
                      <th className="p-2 text-left">Name (CS)</th>
                      <th className="p-2 text-left">Active</th>
                      <th className="p-2 text-left">Sort Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat: any) => (
                      <tr key={cat.id} className="border-b">
                        <td className="p-2 font-mono text-xs">{cat.slug}</td>
                        <td className="p-2">{cat.name_cs}</td>
                        <td className="p-2">
                          {cat.is_active ? '✅' : '❌'}
                        </td>
                        <td className="p-2">{cat.sort_order}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-red-600">
                ⚠️ No categories found! Run the seed.sql file.
              </p>
            )}
          </div>

          {/* Partners */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Partners Table
              {partnersError && (
                <span className="ml-2 text-sm text-red-600">
                  (Error: {partnersError.message})
                </span>
              )}
            </h3>
            <p className="mb-4">
              <strong>Total records:</strong> {partners?.length || 0}
            </p>
            {partners && partners.length > 0 ? (
              <ul className="space-y-2">
                {partners.map((partner: any) => (
                  <li key={partner.id} className="flex items-center gap-2">
                    <span>{partner.is_verified ? '✅' : '❌'}</span>
                    <strong>{partner.name}</strong>
                    <span className="text-xs text-muted-foreground">
                      ({partner.slug})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">
                ⚠️ No partners found! Run the seed.sql file.
              </p>
            )}
          </div>

          {/* Offers */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Offers Table
              {offersError && (
                <span className="ml-2 text-sm text-red-600">
                  (Error: {offersError.message})
                </span>
              )}
            </h3>
            <p className="mb-4">
              <strong>Total records:</strong> {offers?.length || 0}
            </p>
            {offers && offers.length > 0 ? (
              <ul className="space-y-2">
                {offers.map((offer: any) => (
                  <li key={offer.id} className="flex items-center gap-2">
                    <span>{offer.is_active ? '✅' : '❌'}</span>
                    <strong>{offer.title_cs}</strong>
                    <span className="text-xs text-muted-foreground">
                      (Published: {offer.published_at ? '✅' : '❌'})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">
                ⚠️ No offers found! Run the seed.sql file.
              </p>
            )}
          </div>

          {/* Leads */}
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Leads Table
              {leadsError && (
                <span className="ml-2 text-sm text-red-600">
                  (Error: {leadsError.message})
                </span>
              )}
            </h3>
            <p className="mb-4">
              <strong>Total records:</strong> {leads?.length || 0}
            </p>
            {leads && leads.length > 0 ? (
              <p className="text-green-600">
                ✅ {leads.length} lead(s) submitted
              </p>
            ) : (
              <p className="text-muted-foreground">
                No leads yet (this is normal)
              </p>
            )}
          </div>
        </div>

        {/* SQL Commands */}
        <div className="mt-8 rounded-lg border bg-muted/50 p-6">
          <h2 className="mb-4 text-xl font-semibold">🔧 Quick SQL Commands</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Run these in Supabase SQL Editor:
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Check if tables exist:</h3>
              <pre className="overflow-auto rounded bg-black p-4 text-xs text-green-400">
                {`SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('categories', 'partners', 'offers', 'leads');`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Count records:</h3>
              <pre className="overflow-auto rounded bg-black p-4 text-xs text-green-400">
                {`SELECT
  (SELECT COUNT(*) FROM categories) as categories,
  (SELECT COUNT(*) FROM partners) as partners,
  (SELECT COUNT(*) FROM offers) as offers,
  (SELECT COUNT(*) FROM leads) as leads;`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">View all categories:</h3>
              <pre className="overflow-auto rounded bg-black p-4 text-xs text-green-400">
                {`SELECT slug, name_cs, is_active, sort_order
FROM categories
ORDER BY sort_order;`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-primary hover:underline"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    )
  } catch (err: any) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-red-600">
          ❌ Connection Failed
        </h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <pre className="overflow-auto text-sm text-red-800">
            {JSON.stringify(err, null, 2)}
          </pre>
        </div>
        <p className="mt-4">
          Check your <code>.env.local</code> file configuration.
        </p>
      </div>
    )
  }
}
