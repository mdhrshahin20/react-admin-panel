/*
  # Initial schema for admin dashboard

  1. New Tables
    - employees
      - id (uuid, primary key)
      - first_name (text)
      - last_name (text)
      - email (text, unique)
      - phone (text)
      - role (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - services
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - duration (integer) -- in minutes
      - price (decimal)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - locations
      - id (uuid, primary key)
      - name (text)
      - address (text)
      - city (text)
      - state (text)
      - zip (text)
      - phone (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - customers
      - id (uuid, primary key)
      - first_name (text)
      - last_name (text)
      - email (text)
      - phone (text)
      - notes (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - custom_forms
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - fields (jsonb)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  role text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to employees"
  ON employees
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  duration integer NOT NULL,
  price decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  phone text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to locations"
  ON locations
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  notes text,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Custom Forms table
CREATE TABLE IF NOT EXISTS custom_forms (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  fields jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE custom_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access to custom_forms"
  ON custom_forms
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_forms_updated_at
    BEFORE UPDATE ON custom_forms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();