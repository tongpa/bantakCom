/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux');
Ext.require([
    'Ext.window.*',
    'Ext.ux.GMapPanel'
]);

Ext.onReady(function(){
    var mapwin;
    
    Ext.get('show-btn').on('click', function() {
        // create the window on the first click and reuse on subsequent clicks
        if(!mapwin){

            mapwin = Ext.create('Ext.Window', {
                layout: 'fit',
                title: 'GMap Window',
                closeAction: 'hide',
                width:450,
                height:450,
                border: false,
                x: 40,
                y: 60,
                items: {
                    xtype: 'gmappanel',
                    zoomLevel: 14,
                    gmapType: 'map',
                    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                    mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
                    setCenter: {
                        //geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                        geoCodeAddr : 'Bantak Hospital Phahon Yothin Road Ban Tak Tak',
                        marker: {
                        	title: 'Fenway Park',
                        	icon :   new MarkerImage('/images/beachflag.png',
							      // This marker is 20 pixels wide by 32 pixels tall.
							      new  Size(20, 32),
							      // The origin for this image is 0,0.
							      new  Point(0,0),
							      // The anchor for this image is the base of the flagpole at 0,32.
							      new  Point(0, 32)) 
                       }
                    },
                    markers: [{
                        lat: 42.339641,
                        lng: -71.094224,
                        marker: {title: 'Boston Museum of Fine Arts'},
                        listeners: {
                            click: function(e){
                                Ext.Msg.alert({title: 'Its fine', text: 'and its art.'});
                            }
                        }
                    } ]
                }
            });
            
        }
        
        mapwin.show();
        
    });
    
 });
