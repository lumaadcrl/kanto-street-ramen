import { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BranchMap from './components/BranchMap.jsx';
import { branches, menuItems, navigation, openingHours } from './data.js';

const pageTitles = {
  '/': 'Kanto Street Ramen | Cebu', '/about': 'Our Story | Kanto Street Ramen',
  '/menu': 'Menu | Kanto Street Ramen', '/locations': 'Locations | Kanto Street Ramen',
  '/services': 'Services | Kanto Street Ramen', '/contact': 'Contact | Kanto Street Ramen',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = pageTitles[pathname] || pageTitles['/'];
  }, [pathname]);
  return null;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Kanto Street Ramen home" onClick={() => setMenuOpen(false)}>
          <img src="/img/logo.jpg" alt="" width="48" height="48" />
          <span>Kantō <span lang="ja">関東</span><small>Street Ramen</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((isOpen) => !isOpen)}>
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>{item.label}</NavLink>
          ))}
          <Link className="nav-order" to="/menu" onClick={() => setMenuOpen(false)}>Explore the menu <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link className="brand brand-inverted" to="/" aria-label="Kanto Street Ramen home"><img src="/img/logo.jpg" alt="" width="44" height="44" /><span>Kantō <span lang="ja">関東</span><small>Street Ramen</small></span></Link><p>Every bowl, a little comfort from the Kanto region.</p></div>
        <div className="footer-column"><h2>Explore</h2>{navigation.slice(1).map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div>
        <div className="footer-column"><h2>Find us</h2>{branches.map((branch) => <a key={branch.id} href={`https://www.openstreetmap.org/?mlat=${branch.coordinates[0]}&mlon=${branch.coordinates[1]}#map=16/${branch.coordinates[0]}/${branch.coordinates[1]}`} target="_blank" rel="noreferrer">{branch.name}, {branch.area}</a>)}</div>
        <div className="footer-column"><h2>Follow along</h2><a href="https://www.facebook.com/kantostreetramen" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a><a href="https://www.instagram.com/kantostreetramen/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a><a href="mailto:kantostreetramen@gmail.com">Email us</a></div>
      </div>
      <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} Kanto Street Ramen</span><span>Made for good food and good company.</span></div>
    </footer>
  );
}

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span aria-hidden="true">✳</span> {children}</p>;
}

function HomePage() {
  return (
    <main>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy"><Eyebrow>Comfort food, Cebu style</Eyebrow><h1 id="home-title">Big flavor.<br /><em>Warm welcome.</em></h1><p>Japanese-inspired ramen made for everyday cravings and the people you share them with.</p><div className="hero-actions"><Link className="button button-red" to="/menu">See the menu <span aria-hidden="true">↗</span></Link><Link className="text-link" to="/locations">Find your nearest bowl <span aria-hidden="true">→</span></Link></div><div className="hero-note"><span className="note-mark" aria-hidden="true">一</span><span>Slow comfort.<br />No special occasion needed.</span></div></div>
        <div className="hero-image-wrap"><img className="hero-image" src="/img/hero1.png" alt="A steaming bowl of ramen with noodles and toppings" /><span className="image-stamp" aria-label="Kanto Street Ramen">KANTO<br /><b>関東</b></span></div><span className="hero-vertical" aria-hidden="true">A GOOD BOWL BRINGS US TOGETHER</span>
      </section>
      <section className="intro-section section-wrap" aria-labelledby="intro-title"><div className="intro-image"><img src="/img/about.webp" alt="A hearty bowl of Japanese-inspired ramen" loading="lazy" /></div><div className="intro-copy"><Eyebrow>A familiar kind of comfort</Eyebrow><h2 id="intro-title">A taste of tradition.<br /><em>A bowl for everyone.</em></h2><p>Inspired by the Kanto region of Japan, we bring rich, satisfying ramen to Cebu. We believe a great bowl should feel special and still fit into an ordinary day.</p><Link className="text-link" to="/about">Get to know us <span aria-hidden="true">→</span></Link></div></section>
      <section className="menu-callout" aria-labelledby="menu-callout-title"><div className="callout-content"><Eyebrow light>Made to find your favorite</Eyebrow><h2 id="menu-callout-title">Your next comfort<br /><em>is on the menu.</em></h2><p>From classic shoyu to deep, creamy tonkotsu, choose the bowl that sounds like you.</p><Link className="button button-cream" to="/menu">Browse ramen <span aria-hidden="true">↗</span></Link></div><img src="/img/menu.jpg" alt="Freshly prepared ramen served at Kanto" loading="lazy" /><span className="callout-number" aria-hidden="true">01</span></section>
      <section className="branch-preview section-wrap" aria-labelledby="branch-preview-title"><div className="section-heading"><div><Eyebrow>Four places to meet</Eyebrow><h2 id="branch-preview-title">A bowl is <em>closer</em><br />than you think.</h2></div><Link className="text-link" to="/locations">All locations <span aria-hidden="true">→</span></Link></div><div className="branch-strip">{branches.slice(0, 3).map((branch, index) => <article className="branch-teaser" key={branch.id}><span className="branch-index">0{index + 1}</span><h3>{branch.name}</h3><p>{branch.area}</p><span className="branch-hours">{openingHours}</span><Link to="/locations" aria-label={`See ${branch.name} location and map`}>View on map <span aria-hidden="true">↗</span></Link></article>)}</div></section>
    </main>
  );
}

function AboutPage() {
  return <main className="page-main"><section className="page-heading page-heading-image" style={{ '--page-image': 'url("/img/locations.jpg")' }} aria-labelledby="about-title"><Eyebrow light>Our story</Eyebrow><h1 id="about-title">A little Kanto.<br /><em>A lot of heart.</em></h1><p>Ramen inspired by Japan, shared with our Cebu community.</p></section><section className="story-section section-wrap"><div><Eyebrow>What brings us here</Eyebrow><h2>Good food should<br /><em>feel like belonging.</em></h2></div><div className="story-copy"><p>Kanto Street Ramen takes its inspiration from the comforting bowls of Japan's Kanto region and the lively, welcoming spirit of Cebu. Our aim is simple: serve satisfying ramen that people can return to, share, and make their own.</p><p>Whether it is your first bowl or your familiar favorite, there is a place for you at our table.</p><Link className="button button-red" to="/locations">Come say hello <span aria-hidden="true">↗</span></Link></div></section><figure className="story-photo"><img src="/img/cebu_shop.jpg" alt="Kanto Street Ramen's Cebu restaurant" loading="lazy" /><figcaption>Made for everyday meals and the moments around them.</figcaption></figure></main>;
}

function MenuPage() {
  return <main className="page-main"><section className="page-heading menu-heading" aria-labelledby="menu-title"><div><Eyebrow light>Find your bowl</Eyebrow><h1 id="menu-title">The <em>menu.</em></h1><p>Comforting ramen, prepared to order.</p></div><img src="/img/red_noodle.png" alt="Red noodle bowl illustration" /></section><section className="ramen-menu section-wrap" aria-label="Ramen menu and prices"><div className="menu-intro"><span className="menu-aside">KANTO<br />RAMEN<br />MENU</span><div><Eyebrow>Ramen</Eyebrow><h2>Pick a mood.<br /><em>We'll make a bowl.</em></h2><p>Prices are listed in Philippine pesos. Please check with your branch for current availability.</p></div></div><div className="menu-list">{menuItems.map((group) => <article className="price-group" key={group.price}><span className="price-tag">₱{group.price}</span><ul aria-label={`Ramen priced at ${group.price} pesos`}>{group.items.map((item) => <li key={item}>{item}<span aria-hidden="true">•</span></li>)}</ul></article>)}</div></section><section className="noodle-note"><img src="/img/white_noodle.png" alt="White ramen noodles" loading="lazy" /><div><Eyebrow light>Your bowl, your way</Eyebrow><h2>Choose your <em>noodle.</em></h2><p>Ask the team at your branch about noodle options and today's availability.</p><Link className="button button-cream" to="/locations">Find a branch <span aria-hidden="true">↗</span></Link></div></section></main>;
}

function LocationsPage() {
  return <main className="page-main"><section className="page-heading locations-heading" aria-labelledby="locations-title"><Eyebrow>Find your neighborhood bowl</Eyebrow><h1 id="locations-title">Meet us <em>nearby.</em></h1><p>Four Kanto locations around Cebu. Open Tuesday to Sunday, 5:00 PM–9:40 PM.</p></section><section className="locations-layout section-wrap" aria-label="Branch addresses and interactive map"><div className="branch-list">{branches.map((branch, index) => <article className="branch-card" key={branch.id}><span className="branch-index">0{index + 1}</span><div><h2>{branch.name}</h2><p>{branch.area}</p><p className="branch-hours">{openingHours}</p><a href={`https://www.openstreetmap.org/directions?to=${branch.coordinates[0]}%2C${branch.coordinates[1]}`} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></div></article>)}</div><BranchMap /></section></main>;
}

function ServicesPage() {
  const offerings = [
    { number: '01', title: 'Dine in', text: 'Settle in for a freshly made bowl and a relaxed meal at your neighborhood branch.' },
    { number: '02', title: 'Take away', text: 'Prefer to eat elsewhere? Visit your branch to ask about takeaway options.' },
    { number: '03', title: 'Group meals', text: 'Planning a get-together? Contact us ahead of time to discuss your group and branch.' },
  ];
  return <main className="page-main"><section className="page-heading service-heading" aria-labelledby="services-title"><Eyebrow light>Good food, your way</Eyebrow><h1 id="services-title">Come as <em>you are.</em></h1><p>Make room for a quick bowl, a slow meal, or a table full of friends.</p></section><section className="service-list section-wrap" aria-label="Ways to enjoy Kanto Street Ramen">{offerings.map((item) => <article className="service-row" key={item.number}><span className="branch-index">{item.number}</span><h2>{item.title}</h2><p>{item.text}</p><Link to={item.title === 'Group meals' ? '/contact' : '/locations'} aria-label={`${item.title}: find a branch`}>↗</Link></article>)}</section><section className="service-bottom"><img src="/img/mandaue_shop.jpg" alt="Kanto restaurant in Cebu" loading="lazy" /><div><Eyebrow>Ready when you are</Eyebrow><h2>Let's find a<br /><em>good table.</em></h2><Link className="button button-red" to="/locations">See our locations <span aria-hidden="true">↗</span></Link></div></section></main>;
}

function ContactPage() {
  const [status, setStatus] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Kanto website inquiry: ${formData.get('topic')}`);
    const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`);
    setStatus('Opening your email app with your message.');
    window.location.href = `mailto:kantostreetramen@gmail.com?subject=${subject}&body=${body}`;
  }
  return <main className="page-main"><section className="page-heading contact-heading" aria-labelledby="contact-title"><Eyebrow>We'd love to hear from you</Eyebrow><h1 id="contact-title">Say <em>hello.</em></h1><p>Questions, feedback, or planning a group meal? Send us a note.</p></section><section className="contact-layout section-wrap"><div className="contact-details"><Eyebrow>Get in touch</Eyebrow><h2>Good conversations<br /><em>start somewhere.</em></h2><a className="contact-email" href="mailto:kantostreetramen@gmail.com">kantostreetramen@gmail.com <span aria-hidden="true">↗</span></a><p>For branch hours and directions, visit our locations page.</p><Link className="text-link" to="/locations">Find a branch <span aria-hidden="true">→</span></Link></div><form className="contact-form" onSubmit={handleSubmit} aria-label="Send an email inquiry to Kanto Street Ramen"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" autoComplete="name" required /><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required /><label htmlFor="contact-topic">What is this about?</label><select id="contact-topic" name="topic" defaultValue="General question"><option>General question</option><option>Feedback</option><option>Group meal</option><option>Other</option></select><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows="5" required /><button className="button button-red" type="submit">Continue in email <span aria-hidden="true">↗</span></button><p className="form-note" aria-live="polite">{status || 'This form opens your default email app; it does not send data to this website.'}</p></form></section></main>;
}

function NotFoundPage() {
  return <main className="not-found"><Eyebrow>Wrong turn?</Eyebrow><h1>That page isn't <em>on the menu.</em></h1><Link className="button button-red" to="/">Back to home <span aria-hidden="true">↗</span></Link></main>;
}

export default function App() {
  return <><ScrollToTop /><a className="skip-link" href="#main-content">Skip to content</a><Header /><div id="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/menu" element={<MenuPage />} /><Route path="/locations" element={<LocationsPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/pages/index.html" element={<Navigate to="/" replace />} /><Route path="/pages/about.html" element={<Navigate to="/about" replace />} /><Route path="/pages/menu.html" element={<Navigate to="/menu" replace />} /><Route path="/pages/location.html" element={<Navigate to="/locations" replace />} /><Route path="/pages/services.html" element={<Navigate to="/services" replace />} /><Route path="/pages/contact.html" element={<Navigate to="/contact" replace />} /><Route path="*" element={<NotFoundPage />} /></Routes></div><Footer /></>;
}