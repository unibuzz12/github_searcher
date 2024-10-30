import React from "react";

interface RepositoryCardProps {
  repo: {
    id: number;
    name: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  };
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => (
  <div className="repository-card">
    <h3>{repo.name}</h3>
    <p>
      <span>Author : </span>
      {repo.owner.login}
    </p>

    <p>
      <span>Description : </span>
      {repo.description ? repo.description : "No description"}
    </p>

    <div className="repo-info">
      <p>
        <span>Stars : </span>
        {repo.stargazers_count}
      </p>
      <p>
        <span>Forks : </span>
        {repo.forks_count}
      </p>
    </div>
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
      View Repository
    </a>
  </div>
);

export default RepositoryCard;
