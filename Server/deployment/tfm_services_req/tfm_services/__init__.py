from pyramid.config import Configurator
from tfm_services.databases.mysql.context import MySqlContext
from tfm_services.knearest_wrapper.knearest_wrapper_bridge import KnearestWrapperBridge

# "The Fairytale Machine" server entry point
def main(global_config, **settings):
    
    # configure mysql database
    mySqlContext = MySqlContext()
    mySqlContext.configure_engine(**settings)
    
    # configure knearest wrapper
    KnearestWrapperBridge().configure_bridge()
    
    # configure wsgi
    config = Configurator(settings=settings)

    # add url routes

    # Authentication routes
    config.add_route('tfm_register', '/tfm_register')
    config.add_route('tfm_login', '/tfm_login')
    
    # Content routes
    config.add_route('tfm_clear_content', '/tfm_clear_content')

    # Stories routes
    config.add_route('tfm_get_all_stories', '/tfm_get_all_stories')
    config.add_route('tfm_get_stories', '/tfm_get_stories')
    config.add_route('tfm_add_stories', '/tfm_add_stories')

    # Chapters routes
    config.add_route('tfm_get_chapters', '/tfm_get_chapters')
    config.add_route('tfm_add_chapters', '/tfm_add_chapters')
    config.add_route('tfm_send_chapter_response', '/tfm_send_chapter_response')
       
    # Chapters linkings routes
    config.add_route('tfm_add_chapters_linkings', '/tfm_add_chapters_linkings')
    
    # Resources route
    config.add_static_view(name='resources', path='tfm_services:resources')

    # scan services files for view mapping
    config.scan('.authentication.authentication_service')
    config.scan('.content.content_service')
    return config.make_wsgi_app()