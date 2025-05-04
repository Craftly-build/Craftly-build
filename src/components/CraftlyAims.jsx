import {
  ShoppingBag,
  MessageSquare,
  CreditCard,
  Search,
  Package,
  UserPlus,
  Inbox,
  Send,
  Wallet,
  Wrench,
} from "lucide-react"
import "../styles/craftlyAims.css"

const CraftlyAims = () => {
  const buyerSteps = [
    {
      icon: <Search size={24} />,
      title: "Browse and Discover",
      description: "Search for artisans, explore their profiles, and find services/products",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Connect and Request",
      description: "Message artisans or request a service before placing an order",
    },
    {
      icon: <CreditCard size={24} />,
      title: "Place order & Pay",
      description: "Make secure payments through paystack",
    },
    {
      icon: <Package size={24} />,
      title: "Receive your Order",
      description: "Get your handcrafted item or service delivered.",
    },
  ]

  const artisanSteps = [
    {
      icon: <UserPlus size={24} />,
      title: "Create Your Profile",
      description: "Set up your profile, get verified and list your skills/services",
    },
    {
      icon: <Inbox size={24} />,
      title: "Receive Orders",
      description: "Buyers contact you and request work",
    },
    {
      icon: <Send size={24} />,
      title: "Deliver Your Work",
      description: "Complete the order and update the buyer",
    },
    {
      icon: <Wallet size={24} />,
      title: "Get Paid Securely",
      description: "Receive payments through craftly safely",
    },
  ]

  return (
    <section className="how-it-works">
      <div className="container1">
        <div className="section-header1">
          <h2>How Craftly Works</h2>
          <p>A seamless process for both buyers and artisans.</p>
        </div>

        <div className="process-container">
          <div className="process-column buyers">
            <div className="column-header">
              <h3>For Buyers</h3>
              <ShoppingBag className="header-icon" size={24} aria-hidden="true" />
            </div>
            <div className="steps">
              {buyerSteps.map((step, index) => (
                <div className="step" key={index}>
                  <div className="step-icon" aria-hidden="true">
                    {step.icon}
                  </div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="process-column artisans">
            <div className="column-header">
              <h3>For Artisans</h3>
              <Wrench className="header-icon" size={24} aria-hidden="true" />
            </div>
            <div className="steps">
              {artisanSteps.map((step, index) => (
                <div className="step" key={index}>
                  <div className="step-icon" aria-hidden="true">
                    {step.icon}
                  </div>
                  <div className="step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CraftlyAims

