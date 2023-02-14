CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE link_tags (
  tag_id INTEGER NOT NULL,
  link_id INTEGER NOT NULL,
  CONSTRAINT fk_tag_id FOREIGN KEY (tag_id)  REFERENCES tags(id),
  CONSTRAINT fk_link_id FOREIGN KEY (link_id)  REFERENCES links(id),
  PRIMARY KEY (tag_id, link_id)
);