from playwright.sync_api import sync_playwright, expect
import os

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    base_url = "http://localhost:3000"
    verification_dir = "jules-verification-2"

    print("--- Verifying Login Page ---")
    page.goto(f"{base_url}/login")
    expect(page.get_by_role("heading", name="Login")).to_be_visible()
    page.screenshot(path=os.path.join(verification_dir, "login_page.png"))
    print("Login page verified.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
