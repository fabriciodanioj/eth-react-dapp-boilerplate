import React from "react";
import Identicon from "identicon.js";

function Header({ address }) {
  const avatar = address && new Identicon(address, 30).toString();

  return (
    <div className="flex w-screen flex-row items-start justify-between px-10 font-body py-8">
      <h1>Dapp Boilerplate</h1>
      {address && (
        <div className="flex flex-row">
          <span>{address}</span>
          <img
            width={30}
            height={30}
            className="ml-2"
            src={`data:image/png;base64,${avatar}`}
            alt="avatar"
          />
        </div>
      )}
    </div>
  );
}

export default Header;
