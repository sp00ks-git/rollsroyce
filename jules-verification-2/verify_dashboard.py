from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    base_url = "http://localhost:3000"
    verification_dir = "jules-verification-2"

    print("--- Verifying Client Login ---")
    page.goto(f"{base_url}/login")
    page.get_by_placeholder("Email Address").fill("client@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url(f"{base_url}/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "client_dashboard.png"))
    print("Client login and dashboard access verified.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
