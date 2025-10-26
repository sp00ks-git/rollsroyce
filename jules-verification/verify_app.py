from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    base_url = "http://localhost:3000"
    verification_dir = "jules-verification"

    # --- 1. Admin Login and Verification ---
    print("--- Verifying Admin Role ---")
    page.goto(f"{base_url}/login")
    page.get_by_placeholder("Email Address").fill("admin@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url(f"{base_url}/admin")
    expect(page.get_by_role("heading", name="Admin Portal")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "admin_portal.png"))
    print("Admin login and portal access verified.")

    # --- 2. Client Login and Verification ---
    print("\n--- Verifying Client Role ---")
    # Log out by clearing storage (simulates new session)
    context.clear_cookies()
    page.goto(f"{base_url}/login")
    page.get_by_placeholder("Email Address").fill("client@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url(f"{base_url}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "client_dashboard.png"))
    print("Client login and dashboard access verified.")

    # --- 3. Verify Client cannot access Admin Portal ---
    print("\n--- Verifying Client Role Restrictions ---")
    page.goto(f"{base_url}/admin")
    # Expect to be redirected back to the dashboard
    page.wait_for_url(f"{base_url}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
    print("Client correctly blocked from admin portal.")

    # --- 4. Assessor Login and Verification ---
    print("\n--- Verifying Assessor Role ---")
    context.clear_cookies()
    page.goto(f"{base_url}/login")
    page.get_by_placeholder("Email Address").fill("assessor@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    # Assessors are redirected to the dashboard after login
    page.wait_for_url(f"{base_url}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
    # Navigate to the assessor page
    page.goto(f"{base_url}/assessor")
    page.wait_for_url(f"{base_url}/assessor")
    expect(page.get_by_role("heading", name="Assessor Portal")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "assessor_portal.png"))
    print("Assessor login and portal access verified.")

    # --- 5. Test File Upload (as Client) ---
    print("\n--- Verifying File Upload ---")
    context.clear_cookies()
    page.goto(f"{base_url}/login")
    page.get_by_placeholder("Email Address").fill("client@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url(f"{base_url}/dashboard")
    page.goto(f"{base_url}/questionnaires")
    page.wait_for_url(f"{base_url}/questionnaires")
    expect(page.get_by_role("heading", name="Upload Questionnaire")).to_be_visible()
    # Create a dummy file to upload
    file_path = "dummy_questionnaire.docx"
    with open(file_path, "w") as f:
        f.write("This is a test docx file.")
    page.locator('input[type="file"]').set_input_files(file_path)
    page.get_by_role("button", name="Upload").click()
    expect(page.get_by_text("Extracted Text:")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "file_upload_success.png"))
    os.remove(file_path) # Clean up the dummy file
    print("File upload functionality verified.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
