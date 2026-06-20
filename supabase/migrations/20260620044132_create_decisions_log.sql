CREATE TABLE decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  decision text NOT NULL,
  why text NOT NULL,
  alternatives text,
  owner text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_decisions" ON decisions FOR SELECT TO anon USING (true);
CREATE POLICY "insert_decisions" ON decisions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "update_decisions" ON decisions FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "delete_decisions" ON decisions FOR DELETE TO anon USING (true);
