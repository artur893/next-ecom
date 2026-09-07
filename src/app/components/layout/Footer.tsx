export default function Footer() {
  const ulH3Styles = "font-semibold text-xl text-neutral-50 mb-4";
  const ulStyles = "w-48 flex flex-col gap-4";
  return (
    <footer className="bg-gray-900 px-14 py-32 -mx-10 -mb-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <h3 className="text-primary-500 text-3xl font-semibold">
            Devstock<span className="text-neutral-100">Hub</span>
          </h3>
          <p>
            © 2023 DevstockHub
            <br /> All rights reserved
          </p>
          <div>IKONY DODAJ!!!</div>
        </div>
        <div className="flex">
          <ul className={ulStyles}>
            <h3 className={ulH3Styles}>Company</h3>
            <li>About Us</li>
            <li>Contact</li>
            <li>Partner</li>
          </ul>
          <ul className={ulStyles}>
            <h3 className={ulH3Styles}>Social</h3>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
          </ul>
          <ul className={ulStyles}>
            <h3 className={ulH3Styles}>FAQ</h3>
            <li>Account</li>
            <li>Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
          <ul className={ulStyles}>
            <h3 className={ulH3Styles}>Resources</h3>
            <li>E-books</li>
            <li>Tutorials</li>
            <li>Course</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
