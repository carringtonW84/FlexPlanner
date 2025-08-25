INSERT INTO flexplanner.teams(id, code, name, description, is_active, created_at, updated_at)
VALUES 
('A16A697C-608B-4791-9D9D-81F56EB5D8AB', 'TR_XP_CLIENT', 'Tribu Expérience Client', 'Tribu Expérience Client', true, '2025-08-25', '2025-08-25'),
('FB366B2A-E789-43F8-AF87-F66EDBFF07AB', 'TR_OFFRE_PROD', 'Tribu Offre Produit', 'Tribu Offre Produit', true, '2025-08-25', '2025-08-25'),
('8C470F0A-7F9D-4322-BB68-C3CBF4EC781D', 'TR_COMM_REMISE_CLIENT', 'Tribu Commande & Remise au Client', 'Tribu Expérience Client', true, '2025-08-25', '2025-08-25'),
('8E1B8B6E-3E2C-4A2E-B7B6-91A89B1E40A1', 'SQ_ACCUEIL_SERVICES', 'Squad Accueil & Services Client', 'Squad Accueil & Services Client', true, '2025-08-25', '2025-08-25'),
('D6B2F0B4-7E57-4D41-8F25-648D62EAF8E2', 'SQ_AVANTAGES_PROMO', 'Squad Avantages & Promotion', 'Squad Avantages & Promotion', true, '2025-08-25', '2025-08-25'),
('3E04158B-4E1E-4497-9B97-FF4A73F0AB35', 'SQ_EXPERIENCE_OPTIM', 'Squad Expérience & Optimisation', 'Squad Expérience & Optimisation', true, '2025-08-25', '2025-08-25'),
('6D8F4A12-33C9-44C1-917C-BB3E0F12347D', 'SQ_EMERCH', 'Squad e-Merch', 'Squad e-Merch', true, '2025-08-25', '2025-08-25'),
('7B0B2C5D-AD02-43A1-8F9E-09F8C7B2153A', 'SQ_GESTION_ECOM', 'Squad Gestion e-Commerce', 'Squad Gestion e-Commerce', true, '2025-08-25', '2025-08-25'),
('42ED1D59-4D51-49B0-9320-123B4A5F4B73', 'SQ_EXPO_OFFRE', 'Squad Exposition de l''offre', 'Squad Exposition de l''offre', true, '2025-08-25', '2025-08-25'),
('67E93B89-6A1A-4D91-A94B-5897F75AC3A2', 'SQ_TUNNEL_ACHAT', 'Squad Tunnel d''achat', 'Squad Tunnel d''achat', true, '2025-08-25', '2025-08-25'),
('93A6CDE2-72C9-4D33-9FA3-9326B4B9A013', 'SQ_GESTION_CMD', 'Squad Gestion Commande', 'Squad Gestion Commande', true, '2025-08-25', '2025-08-25'),
('15DAB3E7-1C9C-49B7-8511-4C347D64B910', 'SQ_PREPA_LIVRAISON', 'Squad Préparation & Livraison', 'Squad Préparation & Livraison', true, '2025-08-25', '2025-08-25'),
('20F8C357-84F4-4BFA-8D3D-22E7AB6DCC73', 'SQ_PAIEMENT_VALO', 'Squad Paiement & Valorisation', 'Squad Paiement & Valorisation', true, '2025-08-25', '2025-08-25'),
('3BE02A49-9AA6-4E84-B0AF-7C53C4A874B4', 'SQ_CORE_TEAM', 'Squad Core Team', 'Squad Core Team', true, '2025-08-25', '2025-08-25'),
('94F729A5-1B92-472E-86AF-BDC31F6C5219', 'EQ_PILOTAGE_FAB', 'Pilotage de la Fabrique', 'Pilotage de la Fabrique', true, '2025-08-25', '2025-08-25'),
('C1E39E8D-36DF-4D1A-8754-914E5E41B3CE', 'EQ_DESIGN_ANALYTICS', 'Design & Analytics', 'Design & Analytics', true, '2025-08-25', '2025-08-25'),
('E8C1AD49-582B-44B9-8426-3456D3F10A91', 'EQ_CHEFS_PROJETS', 'Chefs de projets', 'Chefs de projets', true, '2025-08-25', '2025-08-25'),
('AF63C62D-4F09-49E2-B9DD-9C1D68EACB17', 'EQ_RESP_APPLI', 'Responsable d''applications', 'Responsable d''applications', true, '2025-08-25', '2025-08-25'),
('A7E0B5C3-1D1A-45E8-A05D-B7C14D09F9F1', 'EQ_QA', 'Quality Assurance', 'Quality Assurance', true, '2025-08-25', '2025-08-25'),
('09F8A5D4-3E5C-41AA-9C21-42F91A07D72C', 'EQ_OPS_GCP', 'Ops GCP', 'Ops GCP', true, '2025-08-25', '2025-08-25'),
('DD0B92F3-7093-42C6-8F45-72953E4E6A89', 'EQ_CHAPTER_LEADS', 'Chapter Leads', 'Chapter Leads', true, '2025-08-25', '2025-08-25'),
('F421ED39-6484-4781-A31D-CB5695FBC3A1', 'EQ_NETTO', 'Netto', 'Netto', true, '2025-08-25', '2025-08-25'),
('6C42E7E9-3249-4728-8AC0-51234B8F6A4F', 'EQ_OPS_BO', 'Ops BO', 'Ops BO', true, '2025-08-25', '2025-08-25');




INSERT INTO flexplanner.users(id, email, password_hash, first_name, last_name, team_id, velocity, is_active, created_at, updated_at, last_login)
VALUES 
(gen_random_uuid(), 'jeremy.courbet@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Jérémy', 'COURBET', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'aurelien.petitjean@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Aurélien', 'PETITJEAN', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'lea.cordella-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Léa', 'CORDELLA', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'hassan.hammami-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Hassan', 'HAMMAMI', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'mathieu.lecoupeur-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Mathieu', 'LECOUPEUR', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'fabien.lamure-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Fabien', 'LAMURE', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'slim.tonnech-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Slim', 'TONNECH', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'fabien.birba-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Fabien', 'BIRBA', 'a16a697c-608b-4791-9d9d-81f56eb5d8ab', 0, true, '2025-08-25', '2025-08-25', '2025-08-25');


INSERT INTO flexplanner.users(id, email, password_hash, first_name, last_name, team_id, velocity, is_active, created_at, updated_at, last_login)
VALUES 
(gen_random_uuid(), 'mathieu.henry-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Mathieu', 'HENRY', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'anouska.dalila-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Anouska', 'DALILA', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'cyrille.ecrabet-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Cyrille', 'ECRABET', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'malek.ferchichi-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Malek', 'FERCHICHI', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'anis.barka-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Anis', 'BARKA', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'dhaker.trimech-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Dhaker', 'TRIMECH', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'hakim.otmani-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Hakim', 'OTMANI', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'nacer.dahlab-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Nacer', 'DAHLAB', '8e1b8b6e-3e2c-4a2e-b7b6-91a89b1e40a1', 0, true, '2025-08-25', '2025-08-25', '2025-08-25');


INSERT INTO flexplanner.users(id, email, password_hash, first_name, last_name, team_id, velocity, is_active, created_at, updated_at, last_login)
VALUES 
(gen_random_uuid(), 'asma.guediri@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Asma', 'GUEDIRI', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
--(gen_random_uuid(), 'anouska.dalila-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Anouska', 'DALILA', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
--(gen_random_uuid(), 'cyrille.ecrabet-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Cyrille', 'ECRABET', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'thomas.vallier-remy-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Thomas', 'VALLIER-REMY', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'ariel.avilaalvarez-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Ariel', 'AVILA ALVAREZ', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'saer.lo@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Saer', 'LO', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'ulrich.kikissagbe@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Ulrich', 'KIKISSAGBE', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'abdessamad.bourhaleb@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Abdessamad', 'BOURHALEB', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'imad.badaoui-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Imad', 'BADAOUI', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'fedi.farjallah-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Fedi', 'FARJALLAH', 'd6b2f0b4-7e57-4d41-8f25-648d62eaf8e2', 0, true, '2025-08-25', '2025-08-25', '2025-08-25');


INSERT INTO flexplanner.users(id, email, password_hash, first_name, last_name, team_id, velocity, is_active, created_at, updated_at, last_login)
VALUES 
(gen_random_uuid(), 'xavier.berdah-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Xavier', 'BERDAH', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'justine.treard-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Justine', 'TREARD', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'kevin.tillot-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Kévin', 'TILLOT', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'fahim.leclercq@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Fahim', 'LECLERCQ', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'leo.marcotte-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Léo', 'MARCOTTE', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'aymeric.davias-courtemanche@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Aymeric', 'DAVIAS-COURTEMANCHE', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25'),
(gen_random_uuid(), 'sana.touaiti-ext@mousquetaires.com', '$2a$11$FGE9oO3JB0LHuhrKTjbR2ufHioHkcwILUFOMygCzCKeCBxVdCB5KC', 'Sana', 'TOUAITI', '3e04158b-4e1e-4497-9b97-ff4a73f0ab35', 0, true, '2025-08-25', '2025-08-25', '2025-08-25');


