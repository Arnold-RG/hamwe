import { GisubizoChat } from '../components/GisubizoChat'

export function GisubizoPage() {
  return (
    <div className="page-pad giso-page">
      <header className="page-hero">
        <p className="eyebrow">Gisubizo · English desk</p>
        <h1>Ask Rwanda. Get a clear answer.</h1>
        <p className="lede">
          Gisubizo is the Hamwe Tourism desk for facts about the country and this company. English only.
          Type a question, or open the list under the chat.
        </p>
      </header>
      <GisubizoChat />
    </div>
  )
}
