-- ================================================
-- MODÈLE DE DONNÉES - WORKFLOW MANAGER
-- Base de données PostgreSQL
-- ================================================

-- Extension pour les UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- TABLES DE CONFIGURATION (constantes)
-- ================================================

-- Table des équipes
CREATE TABLE flexplanner.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des types de congés
CREATE TABLE flexplanner.vacation_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des jours fériés français
CREATE TABLE flexplanner.french_holidays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    holiday_key VARCHAR(10) NOT NULL, -- Format MM-DD
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(holiday_key)
);

-- Table des statuts de présence
CREATE TABLE flexplanner.presence_statuses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    emoji VARCHAR(10),
    color_class VARCHAR(100), -- Classes CSS Tailwind
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des jours de la semaine
CREATE TABLE flexplanner.week_days (
    id SMALLINT PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    short_name VARCHAR(10) NOT NULL,
    is_working_day BOOLEAN DEFAULT TRUE
);

-- ================================================
-- TABLES PRINCIPALES
-- ================================================

-- Table des utilisateurs
CREATE TABLE flexplanner.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    team_id UUID REFERENCES flexplanner.teams(id),
    velocity INTEGER DEFAULT 0, -- Points par sprint
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Table des semaines-types par utilisateur
CREATE TABLE flexplanner.user_weekly_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES flexplanner.users(id) ON DELETE CASCADE,
    week_day_id SMALLINT NOT NULL REFERENCES flexplanner.week_days(id),
    is_onsite BOOLEAN NOT NULL DEFAULT TRUE, -- TRUE = sur site, FALSE = télétravail
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, week_day_id)
);

-- Table du planning utilisateur (exceptions à la semaine-type)
CREATE TABLE flexplanner.user_planning (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES flexplanner.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status_id UUID NOT NULL REFERENCES flexplanner.presence_statuses(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, date)
);

-- Table des congés
CREATE TABLE flexplanner.user_vacations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES flexplanner.users(id) ON DELETE CASCADE,
    vacation_type_id UUID NOT NULL REFERENCES flexplanner.vacation_types(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    notes TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID REFERENCES flexplanner.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (end_date >= start_date)
);

-- ================================================
-- INDEX POUR LES PERFORMANCES
-- ================================================

-- Index sur les clés étrangères
CREATE INDEX idx_users_team_id ON flexplanner.users(team_id);
CREATE INDEX idx_user_weekly_schedules_user_id ON flexplanner.user_weekly_schedules(user_id);
CREATE INDEX idx_user_planning_user_id ON flexplanner.user_planning(user_id);
CREATE INDEX idx_user_planning_date ON flexplanner.user_planning(date);
CREATE INDEX idx_user_vacations_user_id ON flexplanner.user_vacations(user_id);

-- Index composites pour les requêtes fréquentes
CREATE INDEX idx_user_planning_user_date ON flexplanner.user_planning(user_id, date);
CREATE INDEX idx_user_vacations_dates ON flexplanner.user_vacations(start_date, end_date);

-- ================================================
-- TRIGGERS POUR MISE À JOUR AUTOMATIQUE
-- ================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION flexplanner.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers sur toutes les tables avec updated_at
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON flexplanner.teams FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_vacation_types_updated_at BEFORE UPDATE ON flexplanner.vacation_types FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_french_holidays_updated_at BEFORE UPDATE ON flexplanner.french_holidays FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_presence_statuses_updated_at BEFORE UPDATE ON flexplanner.presence_statuses FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON flexplanner.users FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_user_weekly_schedules_updated_at BEFORE UPDATE ON flexplanner.user_weekly_schedules FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_user_planning_updated_at BEFORE UPDATE ON flexplanner.user_planning FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();
CREATE TRIGGER update_user_vacations_updated_at BEFORE UPDATE ON flexplanner.user_vacations FOR EACH ROW EXECUTE FUNCTION flexplanner.update_updated_at_column();

-- ================================================
-- INSERTION DES DONNÉES DE CONFIGURATION
-- ================================================

-- Équipes
INSERT INTO flexplanner.teams (code, name, description) VALUES 
('DEV', 'Équipe Développement', 'Équipe de développement logiciel'),
('MARKETING', 'Équipe Marketing', 'Équipe marketing et communication'),
('DESIGN', 'Équipe Design', 'Équipe design et UX/UI');

-- Types de congés
INSERT INTO flexplanner.vacation_types (code, name, emoji) VALUES 
('PAID_LEAVE', 'Congés payés', '🏖️'),
('RTT', 'RTT', '⏰'),
('SICK_LEAVE', 'Congés maladie', '🏥'),
('TRAINING', 'Formation', '📚');

-- Jours fériés français
INSERT INTO flexplanner.french_holidays (holiday_key, name) VALUES 
('01-01', 'Jour de l''an'),
('05-01', 'Fête du travail'),
('05-08', 'Victoire 1945'),
('07-14', 'Fête nationale'),
('08-15', 'Assomption'),
('11-01', 'Toussaint'),
('11-11', 'Armistice'),
('12-25', 'Noël');

-- Statuts de présence
INSERT INTO flexplanner.presence_statuses (code, name, emoji, color_class) VALUES 
('ONSITE', 'Sur site', '🏢', 'bg-green-100 text-green-800 border-green-200'),
('REMOTE', 'Télétravail', '🏠', 'bg-blue-100 text-blue-800 border-blue-200'),
('VACATION', 'Congés', '🏖️', 'bg-yellow-100 text-yellow-800 border-yellow-200'),
('HOLIDAY', 'Férié', '🎉', 'bg-red-100 text-red-800 border-red-200'),
('WEEKEND', 'Week-end', '🌅', 'bg-gray-100 text-gray-800 border-gray-200');

-- Jours de la semaine
INSERT INTO flexplanner.week_days (id, code, name, short_name, is_working_day) VALUES 
(0, 'MONDAY', 'Lundi', 'lun', TRUE),
(1, 'TUESDAY', 'Mardi', 'mar', TRUE),
(2, 'WEDNESDAY', 'Mercredi', 'mer', TRUE),
(3, 'THURSDAY', 'Jeudi', 'jeu', TRUE),
(4, 'FRIDAY', 'Vendredi', 'ven', TRUE),
(5, 'SATURDAY', 'Samedi', 'sam', FALSE),
(6, 'SUNDAY', 'Dimanche', 'dim', FALSE);

-- ================================================
-- INSERTION DE DONNÉES D'EXEMPLE
-- ================================================

-- Utilisateurs d'exemple
INSERT INTO flexplanner.users (email, password_hash, first_name, last_name, team_id, velocity) VALUES 
('alice.martin@exemple.com', '$2b$10$example_hash_1', 'Alice', 'Martin', (SELECT id FROM flexplanner.teams WHERE code = 'DEV'), 25),
('bob.dupont@exemple.com', '$2b$10$example_hash_2', 'Bob', 'Dupont', (SELECT id FROM flexplanner.teams WHERE code = 'DEV'), 30),
('claire.moreau@exemple.com', '$2b$10$example_hash_3', 'Claire', 'Moreau', (SELECT id FROM flexplanner.teams WHERE code = 'DEV'), 20),
('david.lambert@exemple.com', '$2b$10$example_hash_4', 'David', 'Lambert', (SELECT id FROM flexplanner.teams WHERE code = 'MARKETING'), 15),
('emma.rousseau@exemple.com', '$2b$10$example_hash_5', 'Emma', 'Rousseau', (SELECT id FROM flexplanner.teams WHERE code = 'MARKETING'), 18),
('francois.durand@exemple.com', '$2b$10$example_hash_6', 'François', 'Durand', (SELECT id FROM flexplanner.teams WHERE code = 'DESIGN'), 22),
('gabrielle.leroy@exemple.com', '$2b$10$example_hash_7', 'Gabrielle', 'Leroy', (SELECT id FROM flexplanner.teams WHERE code = 'DESIGN'), 24);

-- Semaines-types d'exemple (pour Alice Martin)
INSERT INTO flexplanner.user_weekly_schedules (user_id, week_day_id, is_onsite) VALUES 
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 1, TRUE),  -- Lundi - sur site
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 2, TRUE),  -- Mardi - sur site
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 3, FALSE), -- Mercredi - télétravail
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 4, TRUE),  -- Jeudi - sur site
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 5, FALSE); -- Vendredi - télétravail

-- Congés d'exemple
INSERT INTO flexplanner.user_vacations (user_id, vacation_type_id, start_date, end_date, status) VALUES 
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 
 (SELECT id FROM flexplanner.vacation_types WHERE code = 'PAID_LEAVE'), 
 '2025-03-15', '2025-03-25', 'approved'),
((SELECT id FROM flexplanner.users WHERE email = 'alice.martin@exemple.com'), 
 (SELECT id FROM flexplanner.vacation_types WHERE code = 'PAID_LEAVE'), 
 '2025-07-10', '2025-07-20', 'pending');

-- ================================================
-- VUES UTILES
-- ================================================

-- Vue pour obtenir le planning complet d'un utilisateur
CREATE VIEW flexplanner.v_user_complete_planning AS
SELECT 
    u.id as user_id,
    u.email,
    u.first_name,
    u.last_name,
    t.name as team_name,
    up.date,
    COALESCE(ps.name, 'Non défini') as status_name,
    COALESCE(ps.emoji, '❓') as status_emoji,
    COALESCE(ps.color_class, 'bg-gray-100') as status_color,
    up.notes
FROM flexplanner.users u
LEFT JOIN flexplanner.teams t ON u.team_id = t.id
LEFT JOIN flexplanner.user_planning up ON u.id = up.user_id
LEFT JOIN flexplanner.presence_statuses ps ON up.status_id = ps.id;

-- Vue pour les congés actifs
CREATE VIEW flexplanner.v_active_vacations AS
SELECT 
    uv.id,
    u.email,
    u.first_name,
    u.last_name,
    vt.name as vacation_type,
    vt.emoji,
    uv.start_date,
    uv.end_date,
    uv.status,
    uv.notes
FROM flexplanner.user_vacations uv
JOIN flexplanner.users u ON uv.user_id = u.id
JOIN flexplanner.vacation_types vt ON uv.vacation_type_id = vt.id
WHERE uv.end_date >= CURRENT_DATE;

-- ================================================
-- FONCTIONS UTILES
-- ================================================

-- Fonction pour obtenir le statut d'un jour pour un utilisateur
CREATE OR REPLACE FUNCTION flexplanner.get_user_day_status(p_user_id UUID, p_date DATE)
RETURNS TABLE(status_code VARCHAR, status_name VARCHAR, status_emoji VARCHAR, status_color VARCHAR) AS $$
BEGIN
    -- Vérifier d'abord s'il y a une planification spécifique
    RETURN QUERY
    SELECT ps.code, ps.name, ps.emoji, ps.color_class
    FROM flexplanner.user_planning up
    JOIN flexplanner.presence_statuses ps ON up.status_id = ps.id
    WHERE up.user_id = p_user_id AND up.date = p_date;
    
    -- Si pas de résultat, vérifier les congés
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 'VACATION'::VARCHAR, 'Congés'::VARCHAR, '🏖️'::VARCHAR, 'bg-yellow-100 text-yellow-800 border-yellow-200'::VARCHAR
        FROM flexplanner.user_vacations uv
        WHERE uv.user_id = p_user_id 
        AND p_date BETWEEN uv.start_date AND uv.end_date
        AND uv.status = 'approved'
        LIMIT 1;
    END IF;
    
    -- Si pas de congés, vérifier les jours fériés
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 'HOLIDAY'::VARCHAR, fh.name::VARCHAR, '🎉'::VARCHAR, 'bg-red-100 text-red-800 border-red-200'::VARCHAR
        FROM flexplanner.french_holidays fh
        WHERE fh.holiday_key = TO_CHAR(p_date, 'MM-DD')
        AND fh.is_active = TRUE;
    END IF;
    
    -- Si c'est un week-end
    IF NOT FOUND AND EXTRACT(DOW FROM p_date) IN (0, 6) THEN
        RETURN QUERY
        SELECT 'WEEKEND'::VARCHAR, 'Week-end'::VARCHAR, '🌅'::VARCHAR, 'bg-gray-100 text-gray-800 border-gray-200'::VARCHAR;
    END IF;
    
    -- Sinon, utiliser la semaine-type
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 
            CASE WHEN uws.is_onsite THEN 'ONSITE' ELSE 'REMOTE' END::VARCHAR,
            CASE WHEN uws.is_onsite THEN 'Sur site' ELSE 'Télétravail' END::VARCHAR,
            CASE WHEN uws.is_onsite THEN '🏢' ELSE '🏠' END::VARCHAR,
            CASE WHEN uws.is_onsite THEN 'bg-green-100 text-green-800 border-green-200' 
                 ELSE 'bg-blue-100 text-blue-800 border-blue-200' END::VARCHAR
        FROM flexplanner.user_weekly_schedules uws
        WHERE uws.user_id = p_user_id 
        AND uws.week_day_id = EXTRACT(DOW FROM p_date);
    END IF;
    
    -- Par défaut : sur site
    IF NOT FOUND THEN
        RETURN QUERY
        SELECT 'ONSITE'::VARCHAR, 'Sur site'::VARCHAR, '🏢'::VARCHAR, 'bg-green-100 text-green-800 border-green-200'::VARCHAR;
    END IF;
END;
$$ LANGUAGE plpgsql;