import {
  VisaIcon,
  MastercardIcon,
  PayPalIcon,
  ApplePayIcon,
  GooglePayIcon,
} from "@/app/components/icons";
import Logo from "../ui/Logo";

export default function Footer() {
  const h3Styles = "font-semibold text-heading-6 text-neutral-50 mb-4";
  const groupStyles = "w-48 flex flex-col gap-4";
  return (
    <footer className="bg-gray-900 px-14 py-32 -mx-10 -mb-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-6">
          <h3 className="text-heading-4 font-semibold">
            <Logo />
          </h3>
          <p>
            © 2023 DevstockHub
            <br /> All rights reserved
          </p>
          <div className="flex gap-2">
            <VisaIcon />
            <MastercardIcon />
            <PayPalIcon />
            <ApplePayIcon />
            <GooglePayIcon />
          </div>
        </div>
        <div className="flex">
          <div className={groupStyles}>
            <h3 className={h3Styles}>Company</h3>
            <ul className="flex flex-col gap-4">
              <li>About Us</li>
              <li>Contact</li>
              <li>Partner</li>
            </ul>
          </div>
          <div className={groupStyles}>
            <h3 className={h3Styles}>Social</h3>
            <ul className="flex flex-col gap-4">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
            </ul>
          </div>
          <div className={groupStyles}>
            <h3 className={h3Styles}>FAQ</h3>
            <ul className="flex flex-col gap-4">
              <li>Account</li>
              <li>Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>
          <div className={groupStyles}>
            <h3 className={h3Styles}>Resources</h3>
            <ul className="flex flex-col gap-4">
              <li>E-books</li>
              <li>Tutorials</li>
              <li>Course</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
