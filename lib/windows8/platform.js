/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
var cordova = require('cordova'),
    exec = require('cordova/exec'),
    channel = cordova.require("cordova/channel");


/*
 * Define native implementations ( there is no native layer, so need to make sure the proxies are there )
*/

require('cordova/plugin/windows8/DeviceProxy');
require('cordova/plugin/windows8/NetworkStatusProxy');
require('cordova/plugin/windows8/AccelerometerProxy');
require('cordova/plugin/windows8/CameraProxy');
require('cordova/plugin/windows8/CaptureProxy');
require('cordova/plugin/windows8/CompassProxy');
require('cordova/plugin/windows8/ContactsProxy');
require('cordova/plugin/windows8/FileProxy');
require('cordova/plugin/windows8/FileTransferProxy');
require('cordova/plugin/windows8/MediaProxy');
require('cordova/plugin/windows8/NotificationProxy');



module.exports = {
    id: "windows8",
    initialize:function() {
        var app = WinJS.Application;

        app.addEventListener("checkpoint", checkpointHandler);
        function checkpointHandler(eventArgs) {
            cordova.fireDocumentEvent('pause');
        };

        Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", resumingHandler, false);
        function resumingHandler() {
            cordova.fireDocumentEvent('resume');
        }

        app.start();
    },
    objects: {
        cordova: {
            path: 'cordova',
            children: {
                commandProxy: {
                    path: 'cordova/commandProxy'
                }
            }
        },
        navigator: {
            children: {
                device: {
                    path: "cordova/plugin/windows8/device",
                    children: {
                        capture: {
                            path: "cordova/plugin/capture"
                        }
                    }
                },
                console: {
                    path: "cordova/plugin/windows8/console"
                }
            }
        },
        FileReader: {
            path: 'cordova/plugin/FileReader'
        },
        File: {
            path: 'cordova/plugin/File'
        }
    },
    merges: {
        navigator: {
            children: {
                geolocation: {
                    path: 'cordova/plugin/windows8/geolocation'
                }
            }
        }
    }
};
