import React from "react";
import moment from "moment";

import locationIcon from "../assets/icon-location.svg";
import websiteIcon from "../assets/icon-website.svg";
import companyIcon from "../assets/icon-company.svg";

interface UserCardProps {
  user: {
    id: number;
    avatar_url: string;
    name?: string;
    login: string;
    html_url: string;
    created_at: Date;
    bio?: string;
    public_repos: number;
    followers: number;
    following: number;
    blog?: string;
    location?: string;
    company?: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="user-card">
    <div className="profile-information">
      <div className="profile-header">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="profile-avatar"
        />
        <p className="joined-date-continer">
          Joined {moment(user.created_at).format("MMMM D YYYY")}
        </p>
      </div>
      <div className="user-name-container">
        <p className="user-name">{user.name ? user.name : "No Name"}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="user-id"
        >
          <h4>{user.login}</h4>
        </a>
      </div>
      <p className="user-bio">
        {user.bio ? user.bio : "This profile has no bio"}
      </p>
      <div className="user-work-information">
        <div className="repo-container">
          <p>Repos</p>
          <p className="repos">{user.public_repos}</p>
        </div>
        <div className="followers-container">
          <p>Followers</p>
          <p className="followers">{user.followers}</p>
        </div>
        <div className="following-container">
          <p>Following</p>
          <p className="following">{user.following}</p>
        </div>
      </div>
      <div className="user-links">
        <div className="user-location">
          <img src={locationIcon} alt="Location Logo" />
          <p>{user.location ? user.location : "No location"}</p>
        </div>
        <div className="user-website-link">
          <img src={websiteIcon} alt="Website Logo" />
          <p>
            {user.blog ? (
              <a href={user.blog} target="_blank">
                Blog
              </a>
            ) : (
              "No Blog"
            )}
          </p>
        </div>
        <div className="user-company">
          <img src={companyIcon} alt="Company Logo" />
          <p>{user.company ? user.company : "No Company"}</p>
        </div>
      </div>
    </div>
  </div>
);

export default UserCard;
