create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  is_child_patient boolean not null default false,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Anyone can submit a booking"
  on public.bookings for insert
  to anon, authenticated
  with check (true);
