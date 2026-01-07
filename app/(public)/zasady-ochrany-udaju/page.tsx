export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl prose prose-slate">
        <h1>Zásady ochrany osobních údajů</h1>

        <p className="lead">
          Ochrana vašich osobních údajů je pro nás prioritou. Tento dokument popisuje,
          jak shromažďujeme, používáme a chráníme vaše osobní údaje.
        </p>

        <h2>1. Správce osobních údajů</h2>
        <p>
          Správcem vašich osobních údajů je provozovatel projektu StartupPackage.
          Kontakt: info@startuppackage.cz
        </p>

        <h2>2. Jaké údaje sbíráme</h2>
        <p>Při využívání našich služeb můžeme shromažďovat následující údaje:</p>
        <ul>
          <li>Jméno a příjmení</li>
          <li>E-mailová adresa</li>
          <li>Telefonní číslo</li>
          <li>Název společnosti</li>
          <li>Poznámky, které uvedete ve formuláři</li>
          <li>IP adresa a technické údaje o zařízení (pro zajištění bezpečnosti)</li>
        </ul>

        <h2>3. Účel zpracování</h2>
        <p>Vaše osobní údaje zpracováváme za těmito účely:</p>
        <ul>
          <li>Zprostředkování kontaktu s našimi partnery</li>
          <li>Komunikace ohledně nabídek a služeb</li>
          <li>Zasílání marketingových sdělení (pouze se souhlasem)</li>
          <li>Zlepšování našich služeb</li>
          <li>Plnění právních povinností</li>
        </ul>

        <h2>4. Právní základ zpracování</h2>
        <p>Vaše údaje zpracováváme na základě:</p>
        <ul>
          <li>Vašeho souhlasu (čl. 6 odst. 1 písm. a) GDPR)</li>
          <li>Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</li>
          <li>Oprávněného zájmu (čl. 6 odst. 1 písm. f) GDPR)</li>
        </ul>

        <h2>5. Předávání údajů třetím stranám</h2>
        <p>
          Vaše údaje předáváme pouze partnerům, jejichž nabídky máte zájem využít.
          Každý partner je povinen dodržovat zásady ochrany osobních údajů v souladu s GDPR.
        </p>

        <h2>6. Doba uchovávání</h2>
        <p>
          Osobní údaje uchováváme po dobu nezbytnou k naplnění účelu zpracování,
          nejdéle však 5 let od posledního kontaktu. Marketingové souhlasy můžete kdykoli odvolat.
        </p>

        <h2>7. Vaše práva</h2>
        <p>Máte právo:</p>
        <ul>
          <li>Na přístup k vašim osobním údajům</li>
          <li>Na opravu nepřesných údajů</li>
          <li>Na výmaz údajů ("právo být zapomenut")</li>
          <li>Na omezení zpracování</li>
          <li>Na přenositelnost údajů</li>
          <li>Vznést námitku proti zpracování</li>
          <li>Odvolat souhlas se zpracováním</li>
          <li>Podat stížnost u Úřadu pro ochranu osobních údajů</li>
        </ul>

        <h2>8. Cookies</h2>
        <p>
          Náš web používá cookies pro zajištění funkčnosti a analýzu návštěvnosti.
          Více informací o cookies najdete v našich zásadách používání cookies.
        </p>

        <h2>9. Zabezpečení</h2>
        <p>
          Používáme moderní technická a organizační opatření k ochraně vašich údajů
          před neoprávněným přístupem, ztrátou nebo zneužitím.
        </p>

        <h2>10. Kontakt</h2>
        <p>
          Máte-li jakékoli dotazy ohledně zpracování osobních údajů, kontaktujte nás na:
          <br />
          E-mail: info@startuppackage.cz
          <br />
          Telefon: +420 725 568 866
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
        </p>
      </div>
    </div>
  )
}
