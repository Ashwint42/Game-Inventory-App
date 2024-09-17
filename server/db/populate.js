const { createId } = require("./utils");
const { Client } = require("pg");

async function executeQuery() {
  const client = new Client({
    connectionString:
      "postgresql://postgres:admin@localhost:5432/game_inventory",
  });

  console.log("Client Trying to connect");
  await client.connect();
  console.log("Connection Established successfully");

  // Generate UUIDs for the entries
  const genreActionId = createId();
  const genreAdventureId = createId();
  const genreRpgId = createId();
  const genreSimulationId = createId();

  const platformPcId = createId();
  const platformPlayStationId = createId();
  const platformXboxId = createId();
  const platformSwitchId = createId();

  const publisherEaId = createId();
  const publisherUbisoftId = createId();
  const publisherNintendoId = createId();

  const developerTypeIndependentId = createId();
  const developerTypeAaaId = createId();
  const developerTypeIndieId = createId();

  const developerUbisoftId = createId();
  const developerThatgamecompanyId = createId();
  const developerJohnScottsId = createId();

  const gameZeldaId = createId();
  const gameSimsId = createId();
  const gameValhallaId = createId();

  const SQL = `
    DROP TABLE IF EXISTS game, developer, developer_type, genre, publisher, platform;

    CREATE TABLE genre (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );

    CREATE TABLE platform (
      id UUID PRIMARY KEY,
      platform_type VARCHAR(255) NOT NULL
    );

    CREATE TABLE publisher (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255)
    );

    CREATE TABLE developer_type (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );

    CREATE TABLE developer (
      id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      developer_type UUID REFERENCES developer_type(id),
      description VARCHAR(255)
    );

    CREATE TABLE game (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      genre UUID REFERENCES genre(id),
      platform UUID REFERENCES platform(id),
      release_year DATE NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      quantity INT NOT NULL,
      developer UUID REFERENCES developer(id),
      publisher UUID REFERENCES publisher(id),
      rating DECIMAL(3, 1),
      description VARCHAR(255)
    );

    INSERT INTO genre (id, title) VALUES
    ('${genreActionId}', 'Action'),
    ('${genreAdventureId}', 'Adventure'),
    ('${genreRpgId}', 'RPG'),
    ('${genreSimulationId}', 'Simulation');

    INSERT INTO platform (id, platform_type) VALUES
    ('${platformPcId}', 'PC'),
    ('${platformPlayStationId}', 'PlayStation'),
    ('${platformXboxId}', 'Xbox'),
    ('${platformSwitchId}', 'Nintendo Switch');

    INSERT INTO publisher (id, name, address) VALUES
    ('${publisherEaId}', 'Electronic Arts', '209 Redwood Shores Pkwy, Redwood City, CA'),
    ('${publisherUbisoftId}', 'Ubisoft', '28 Rue Armand Carrel, Montreuil, France'),
    ('${publisherNintendoId}', 'Nintendo', '11-1 Kamitoba Hokotate-cho, Minami-ku, Kyoto, Japan');

    INSERT INTO developer_type (id, title) VALUES
    ('${developerTypeIndependentId}', 'Independent'),
    ('${developerTypeAaaId}', 'AAA'),
    ('${developerTypeIndieId}', 'Indie');

    INSERT INTO developer (id, name, developer_type, description) VALUES
    ('${developerUbisoftId}', 'Ubisoft Montreal', '${developerTypeAaaId}', 'Ubisoft Montreal, a major AAA game development studio.'),
    ('${developerThatgamecompanyId}', 'Thatgamecompany', '${developerTypeIndependentId}', 'Thatgamecompany, an independent developer.'),
    ('${developerJohnScottsId}', 'John Scotts', '${developerTypeIndieId}', 'Indie developer known for creative games.');

    INSERT INTO game (id, title, genre, platform, release_year, price, quantity, developer, publisher, rating, description) VALUES
    ('${gameZeldaId}', 'The Legend of Zelda: Breath of the Wild', '${genreAdventureId}', '${platformSwitchId}', '2017-03-03', 59.99, 10, '${developerJohnScottsId}', '${publisherNintendoId}', 9.5, 'An action-adventure game set in a vast open world.'),
    ('${gameSimsId}', 'The Sims 4', '${genreSimulationId}', '${platformPcId}', '2014-09-02', 39.99, 20, '${developerUbisoftId}', '${publisherEaId}', 8.0, 'A simulation game where players control virtual characters and their lives.'),
    ('${gameValhallaId}', 'Assassin’s Creed Valhalla', '${genreAdventureId}', '${platformPlayStationId}', '2020-11-10', 59.99, 15, '${developerUbisoftId}', '${publisherUbisoftId}', 8.7, 'An action-adventure game set in the Viking era.');
  `;

  console.log("Seeding Started...");
  await client.query(SQL);
  console.log("Seeding Complete");

  await client.end();
  console.log("Database seeding successful....");
}

executeQuery().catch((err) => console.log("Error executing query: ", err));
