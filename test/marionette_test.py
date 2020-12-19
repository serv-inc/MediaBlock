import marionette_driver


def test_bad_comp():
    """test that image is not shown, this SHOULD fail if you toggle the popup to true"""
    a = marionette_driver.marionette.Marionette()
    a.start_session()
    _switch_or_go(a, "localhost:8000")
    b = a.find_element("tag name", "img")
    assert not b.is_displayed()  # True if good company, else False


def _switch_or_go(mario, url):
    """switch to tab if url exists, else go there"""
    # better: create new
    # better: also switch after test ends
    found = False
    for handle in mario.window_handles:
        mario.switch_to_window(handle)
        if url in mario.get_url():
            found = True
            break
    if not found:
        mario.navigate("localhost:8000")
