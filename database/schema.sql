-- SwarnLanka AI Schema
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  image_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  category VARCHAR(50),
  severity INT,
  priority_score INT,
  status VARCHAR(20) DEFAULT ''pending'',
  department_id INT REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_analysis (
  id SERIAL PRIMARY KEY,
  report_id INT REFERENCES reports(id) ON DELETE CASCADE,
  result JSONB,
  confidence FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO departments (name) VALUES
  (''Road Maintenance''), (''Waste Management''), (''Electrical Department''),
  (''Water Department''), (''Parks / Disaster Management''), (''Traffic Department'');
