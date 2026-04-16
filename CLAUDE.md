# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Entrena tu Glamour** - Web registration system for a fitness event organized by GLAMOUR México with Adidas and Innova Sport sponsorship.

## Architecture

- **Frontend**: Vanilla HTML, CSS, JavaScript (no frameworks)
- **Backend**: Supabase (BaaS) with vanilla JS
- **Database**: PostgreSQL via Supabase

## File Structure

```
entrena-tu-glamour/
├── index.html           # Landing Page with registration form
├── admin.html           # Admin panel with participant list
├── assets/
│   ├── style.css       # Custom styles
│   └── img/            # Images
└── app/
    ├── main.js         # Main application script
    ├── config.js       # Environment config & Supabase connection
    ├── db.js           # Supabase connection & queries
    ├── db.sql          # Database creation script for Supabase
    └── send-mail.js    # Email sending via Supabase
```

## Business Rules

- **Disciplines**: Kick Boxing, Yoga, Pilates, Zumba
- **Time blocks**: 
  - Bloque 1: 9:00-12:00
  - Bloque 2: 14:00-17:00
  - Bloque 3: 18:00-21:00
- **Capacity**: Yoga = 20 per block; Others = 10 per block
- **Constraints**: One registration per email, one discipline/block per participant, no overbooking

## Database Schema

**actividades**: actividad_id (PK), bloque, disciplina, horario, cupo
**participantes**: email (PK), nombre, apellidos, nacimiento
**registros**: registro_id (PK, AI), email (FK), actividad (FK), fecha

## Design Guidelines

- Responsive, modern design aligned with GLAMOUR México, Adidas, Innova Sport
- Accent color: lime green (#cddc39)
- Vector logo combining "Entrena tu Glamour" with GLAMOUR México branding
- Minimalist vector icons for each discipline
- Hero section with background video of women exercising
- Countdown timer to event date (configured in config.js)

## Key Features

**Landing Page (index.html)**
- Real-time availability display
- Dynamic time block selection based on discipline
- Form validation, duplicate prevention, capacity checks
- Confirmation email on registration

**Admin Panel (admin.html)**
- Password-protected access
- Spreadsheet-style participant table with CRUD operations
- Filtering by discipline, block, schedule, registration date

## Development Notes

- Use prepared statements for SQL injection prevention
- Implement transactions in stored procedures
- Use CASCADE on foreign keys
- Validate capacity before inserting registrations
- Return JSON for AJAX responses
