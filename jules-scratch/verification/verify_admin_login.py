from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:3000/login")
    page.wait_for_selector('input[name="email"]')
    page.get_by_placeholder("Email Address").fill("admin@example.com")
    page.get_by_placeholder("Password").fill("password123")
    page.get_by_role("button", name="Login").click()
    page.wait_for_url("http://localhost:3000/admin")
    page.screenshot(path="jules-scratch/verification/admin_portal.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
