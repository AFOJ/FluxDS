import { Card } from './components/card/Card'

export function App() {
  return (
    <div class={'p-6 space-y-8'}>
      <section>
        <h2>Cards</h2>
        <div class={'flex gap-4 flex-wrap'}>
          <Card
            mainText="Join the family."
            ctaText="Become a member"
            onCtaClick={() => {}}
            icon="user"
          />

          <span data-theme="BrandB">
            <Card
              mainText="Join the family."
              ctaText="Become a member"
              onCtaClick={() => {}}
              icon="user"
            />
          </span>
        </div>
      </section>
    </div>
  )
}
