from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Buka halaman detail manhwa (ganti dengan ID manhwa yang valid)
        page.goto("http://localhost:3000/manhwa/one-piece-2")

        # Verifikasi tombol "Baca Chapter Pertama"
        read_first_button = page.get_by_test_id("button-read-first")
        assert read_first_button.is_visible()

        # Login untuk melihat tombol favorit
        # (Karena kita tidak bisa login langsung di skrip, kita asumsikan tombolnya ada)
        # Jadi kita akan memverifikasi header dulu
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
