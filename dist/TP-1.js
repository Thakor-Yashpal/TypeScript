var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d;
var _this = this;
var UserStatus;
(function (UserStatus) {
    UserStatus["LoggedIn"] = "Logged In";
    UserStatus["LoggingIn"] = "Logging In";
    UserStatus["LoggedOut"] = "Logged Out";
    UserStatus["LogInError"] = "Log In Error";
    UserStatus["VerifyingLogIn"] = "Verifying Log In";
})(UserStatus || (UserStatus = {}));
var Default;
(function (Default) {
    Default["PIN"] = "1234";
})(Default || (Default = {}));
var WeatherType;
(function (WeatherType) {
    WeatherType["Cloudy"] = "Cloudy";
    WeatherType["Rainy"] = "Rainy";
    WeatherType["Stormy"] = "Stormy";
    WeatherType["Sunny"] = "Sunny";
})(WeatherType || (WeatherType = {}));
var defaultPosition = function () { return ({
    left: 0,
    x: 0
}); };
var N = {
    clamp: function (min, value, max) { return Math.min(Math.max(min, value), max); },
    rand: function (min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
};
var T = {
    format: function (date) {
        var hours = T.formatHours(date.getHours()), minutes = date.getMinutes(), seconds = date.getSeconds();
        return hours + ":" + T.formatSegment(minutes);
    },
    formatHours: function (hours) {
        return hours % 12 === 0 ? 12 : hours % 12;
    },
    formatSegment: function (segment) {
        return segment < 10 ? "0" + segment : segment;
    }
};
var LogInUtility = {
    verify: function (pin) { return __awaiter(_this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        if (pin === Default.PIN) {
                            resolve(true);
                        }
                        else {
                            reject("Invalid pin: " + pin);
                        }
                    }, N.rand(300, 700));
                })];
        });
    }); }
};
var useCurrentDateEffect = function () {
    var _a = React.useState(new Date()), date = _a[0], setDate = _a[1];
    React.useEffect(function () {
        var interval = setInterval(function () {
            var update = new Date();
            if (update.getSeconds() !== date.getSeconds()) {
                setDate(update);
            }
        }, 100);
        return function () { return clearInterval(interval); };
    }, [date]);
    return date;
};
var ScrollableComponent = function (props) {
    var ref = React.useRef(null);
    var _a = React.useState({
        grabbing: false,
        position: defaultPosition()
    }), state = _a[0], setStateTo = _a[1];
    var handleOnMouseDown = function (e) {
        setStateTo(__assign(__assign({}, state), { grabbing: true, position: {
                x: e.clientX,
                left: ref.current.scrollLeft
            } }));
    };
    var handleOnMouseMove = function (e) {
        if (state.grabbing) {
            var left = Math.max(0, state.position.left + (state.position.x - e.clientX));
            ref.current.scrollLeft = left;
        }
    };
    var handleOnMouseUp = function () {
        if (state.grabbing) {
            setStateTo(__assign(__assign({}, state), { grabbing: false }));
        }
    };
    return ref = { ref: ref };
    className = { classNames: function (, props) { }, : .className };
    id = { props: props, : .id };
    onMouseDown = { handleOnMouseDown: handleOnMouseDown };
    onMouseMove = { handleOnMouseMove: handleOnMouseMove };
    onMouseUp = { handleOnMouseUp: handleOnMouseUp };
    onMouseLeave = { handleOnMouseUp: handleOnMouseUp }
        >
            { props: props, : .children }
        < /div>;
};
;
var WeatherSnap = function () {
    var temperature = React.useState(N.rand(65, 85))[0];
    return className = "weather" >
        className;
    "weather-type";
    className = "fa-duotone fa-sun" /  >
        className;
    "weather-temperature-value" > { temperature: temperature } < /span>
        < span;
    className = "weather-temperature-unit" > ;
    F < /span>
        < /span>;
};
var Reminder = function () {
    return className = "reminder" >
        className;
    "reminder-icon" >
        className;
    "fa-regular fa-bell" /  >
        /div>
        < span;
    className = "reminder-text" > Extra;
    cool;
    people;
    meeting < span;
    className = "reminder-time" > 10;
    AM < /span></span >
        /div>;
};
var Time = function () {
    var date = useCurrentDateEffect();
    return className = "time" > { T: T, : .format(date) } < /span>;
};
var Info = function (props) {
    return id = { props: props, : .id };
    className = "info" >
        />
        < WeatherSnap /  >
        /div>;
};
var PinDigit = function (props) {
    var _a = React.useState(false), hidden = _a[0], setHiddenTo = _a[1];
    React.useEffect(function () {
        if (props.value) {
            var timeout_1 = setTimeout(function () {
                setHiddenTo(true);
            }, 500);
            return function () {
                setHiddenTo(false);
                clearTimeout(timeout_1);
            };
        }
    }, [props.value]);
    return className = { classNames: function (, _a) {
            var props = _a.focused;
        }, : .focused, hidden: hidden };
};
 >
    className;
"app-pin-digit-value" > { props: props, : .value || "" } < /span>
    < /div>;
var Pin = function () {
    var _a = React.useContext(AppContext), userStatus = _a.userStatus, setUserStatusTo = _a.setUserStatusTo;
    var _b = React.useState(""), pin = _b[0], setPinTo = _b[1];
    var ref = React.useRef(null);
    React.useEffect(function () {
        if (userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) {
            ref.current.focus();
        }
        else {
            setPinTo("");
        }
    }, [userStatus]);
    React.useEffect(function () {
        if (pin.length === 4) {
            var verify = function () { return __awaiter(_this, void 0, Promise, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            setUserStatusTo(UserStatus.VerifyingLogIn);
                            return [4 /*yield*/, LogInUtility.verify(pin)];
                        case 1:
                            if (_a.sent()) {
                                setUserStatusTo(UserStatus.LoggedIn);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            console.error(err_1);
                            setUserStatusTo(UserStatus.LogInError);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            verify();
        }
        if (userStatus === UserStatus.LogInError) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    }, [pin]);
    var handleOnClick = function () {
        ref.current.focus();
    };
    var handleOnCancel = function () {
        setUserStatusTo(UserStatus.LoggedOut);
    };
    var handleOnChange = function (e) {
        if (e.target.value.length <= 4) {
            setPinTo(e.target.value.toString());
        }
    };
    var getCancelText = function () {
        return id = "app-pin-cancel-text";
        onClick = { handleOnCancel: handleOnCancel } > Cancel < /span>;
    };
};
var getErrorText = function () {
    if (userStatus === UserStatus.LogInError) {
        return id = "app-pin-error-text" > Invalid < /span>;
    }
};
return id = "app-pin-wrapper" >
    disabled;
{
    userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError;
}
id = "app-pin-hidden-input";
maxLength = { 4:  };
ref = { ref: ref };
type = "number";
value = { pin: pin };
onChange = { handleOnChange: handleOnChange }
    /  >
    id;
"app-pin";
onClick = { handleOnClick: handleOnClick } >
    focused;
{
    pin.length === 0;
}
value = (_a = { pin: pin }, _a[0] = , _a) /  >
    focused;
{
    pin.length === 1;
}
value = (_b = { pin: pin }, _b[1] = , _b) /  >
    focused;
{
    pin.length === 2;
}
value = (_c = { pin: pin }, _c[2] = , _c) /  >
    focused;
{
    pin.length === 3;
}
value = (_d = { pin: pin }, _d[3] = , _d) /  >
    /div>
    < h3;
id = "app-pin-label" > Enter;
PIN(1234);
{
    getErrorText();
}
{
    getCancelText();
}
/h3>
    < /div>;
var MenuSection = function (props) {
    var getContent = function () {
        if (props.scrollable) {
            return className = "menu-section-content" >
                { props: props, : .children }
                < /ScrollableComponent>;
        }
    };
};
;
return className = "menu-section-content" >
    { props: props, : .children }
    < /div>;
;
return id = { props: props, : .id };
className = "menu-section" >
    className;
"menu-section-title" >
    className;
{
    props.icon;
}
/>
    < span;
className = "menu-section-title-text" > { props: props, : .title } < /span>
    < /div>;
{
    getContent();
}
/div>;
var QuickNav = function () {
    var getItems = function () {
        return [{
                id: 1,
                label: "Weather"
            }, {
                id: 2,
                label: "Food"
            }, {
                id: 3,
                label: "Apps"
            }, {
                id: 4,
                label: "Movies"
            }].map(function (item) {
            return key = { item: item, : .id };
            className = "quick-nav-item clear-button" >
                className;
            "quick-nav-item-label" > { item: item, : .label } < /span>
                < /div>;
        });
    };
};
return id = "quick-nav" >
    {}
    < /ScrollableComponent>;
;
var Weather = function () {
    var getDays = function () {
        return [{
                id: 1,
                name: "Mon",
                temperature: N.rand(60, 80),
                weather: WeatherType.Sunny
            }, {
                id: 2,
                name: "Tues",
                temperature: N.rand(60, 80),
                weather: WeatherType.Sunny
            }, {
                id: 3,
                name: "Wed",
                temperature: N.rand(60, 80),
                weather: WeatherType.Cloudy
            }, {
                id: 4,
                name: "Thurs",
                temperature: N.rand(60, 80),
                weather: WeatherType.Rainy
            }, {
                id: 5,
                name: "Fri",
                temperature: N.rand(60, 80),
                weather: WeatherType.Stormy
            }, {
                id: 6,
                name: "Sat",
                temperature: N.rand(60, 80),
                weather: WeatherType.Sunny
            }, {
                id: 7,
                name: "Sun",
                temperature: N.rand(60, 80),
                weather: WeatherType.Cloudy
            }].map(function (day) {
            var getIcon = function () {
                switch (day.weather) {
                    case WeatherType.Cloudy:
                        return "fa-duotone fa-clouds";
                    case WeatherType.Rainy:
                        return "fa-duotone fa-cloud-drizzle";
                    case WeatherType.Stormy:
                        return "fa-duotone fa-cloud-bolt";
                    case WeatherType.Sunny:
                        return "fa-duotone fa-sun";
                }
            };
            return key = { day: day, : .id };
            className = "day-card" >
                className;
            "day-card-content" >
                className;
            "day-weather-temperature" > { day: day, : .temperature } < span;
            className = "day-weather-temperature-unit" > ;
            F < /span></span >
                className;
            {
                classNames("day-weather-icon", getIcon(), day.weather.toLowerCase());
            }
            />
                < span;
            className = "day-name" > { day: day, : .name } < /span>  
                < /div>  
                < /div>;
        });
    };
};
return icon = "fa-solid fa-sun";
id = "weather-section";
scrollable;
title = "How's it look out there?" >
    {}
    < /MenuSection>;
var Tools = function () {
    var getTools = function () {
        return [{
                icon: "fa-solid fa-cloud-sun",
                id: 1,
                image: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYXRoZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                label: "Weather",
                name: "Cloudly"
            }, {
                icon: "fa-solid fa-calculator-simple",
                id: 2,
                image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FsY3VsYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "Calc",
                name: "Mathio"
            }, {
                icon: "fa-solid fa-piggy-bank",
                id: 3,
                image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmFua3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "Bank",
                name: "Cashy"
            }, {
                icon: "fa-solid fa-plane",
                id: 4,
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                label: "Travel",
                name: "Fly-er-io-ly"
            }, {
                icon: "fa-solid fa-gamepad-modern",
                id: 5,
                image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "Games",
                name: "Gamey"
            }, {
                icon: "fa-solid fa-video",
                id: 6,
                image: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpZGVvJTIwY2hhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                label: "Video Chat",
                name: "Chatty"
            }].map(function (tool) {
            var styles = {
                backgroundImage: "url(" + tool.image + ")"
            };
            return key = { tool: tool, : .id };
            className = "tool-card" >
                className;
            "tool-card-background background-image";
            style = { styles: styles } /  >
                className;
            "tool-card-content" >
                className;
            "tool-card-content-header" >
                className;
            "tool-card-label" > { tool: tool, : .label } < /span>
                < span;
            className = "tool-card-name" > { tool: tool, : .name } < /span>
                < /div>
                < i;
            className = { classNames: function (tool) { }, : .icon, "tool-card-icon":  };
        });
    };
    />
        < /div>
        < /div>;
};
;
return icon = "fa-solid fa-toolbox";
id = "tools-section";
title = "What's Appening?" >
    {}
    < /MenuSection>;
;
var Restaurants = function () {
    var getRestaurants = function () {
        return [{
                desc: "The best burgers in town",
                id: 1,
                image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                title: "Burgers"
            }, {
                desc: "The worst ice-cream around",
                id: 2,
                image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aWNlJTIwY3JlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "Ice Cream"
            }, {
                desc: "This 'Za be gettin down",
                id: 3,
                image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "Pizza"
            }, {
                desc: "BBQ ain't need no rhyme",
                id: 4,
                image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFyYmVxdWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "BBQ"
            }].map(function (restaurant) {
            var styles = {
                backgroundImage: "url(" + restaurant.image + ")"
            };
            return key = { restaurant: restaurant, : .id };
            className = "restaurant-card background-image";
            style = { styles: styles } >
                className;
            "restaurant-card-content" >
                className;
            "restaurant-card-content-items" >
                className;
            "restaurant-card-title" > { restaurant: restaurant, : .title } < /span>
                < span;
            className = "restaurant-card-desc" > { restaurant: restaurant, : .desc } < /span>  
                < /div>
                < /div>
                < /div>;
        });
    };
};
return icon = "fa-regular fa-pot-food";
id = "restaurants-section";
title = "Get it delivered!" >
    {}
    < /MenuSection>;
var Movies = function () {
    var getMovies = function () {
        return [{
                desc: "A tale of some people watching over a large portion of space.",
                id: 1,
                icon: "fa-solid fa-galaxy",
                image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFydmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                title: "Protectors of the Milky Way"
            }, {
                desc: "Some people leave their holes to disrupt some things.",
                id: 2,
                icon: "fa-solid fa-hat-wizard",
                image: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9yZCUyMG9mJTIwdGhlJTIwcmluZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "Hole People"
            }, {
                desc: "A boy with a dent in his head tries to stop a bad guy. And by bad I mean bad at winning.",
                id: 3,
                icon: "fa-solid fa-broom-ball",
                image: "https://images.unsplash.com/photo-1632266484284-a11d9e3a460a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcnJ5JTIwcG90dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
                title: "Pot of Hair"
            }, {
                desc: "A long drawn out story of some people fighting over some space. Cuz there isn't enough of it.",
                id: 4,
                icon: "fa-solid fa-starship-freighter",
                image: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RhciUyMHdhcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                title: "Area Fights"
            }].map(function (movie) {
            var styles = {
                backgroundImage: "url(" + movie.image + ")"
            };
            var id = "movie-card-" + movie.id;
            return key = { movie: movie, : .id };
            id = { id: id };
            className = "movie-card" >
                className;
            "movie-card-background background-image";
            style = { styles: styles } /  >
                className;
            "movie-card-content" >
                className;
            "movie-card-info" >
                className;
            "movie-card-title" > { movie: movie, : .title } < /span>
                < span;
            className = "movie-card-desc" > { movie: movie, : .desc } < /span>
                < /div>
                < i;
            className = { movie: movie, : .icon } /  >
                /div>
                < /div>;
        });
    };
};
return icon = "fa-solid fa-camera-movie";
id = "movies-section";
scrollable;
title = "Popcorn time!" >
    {}
    < /MenuSection>;
;
var UserStatusButton = function (props) {
    var _a = React.useContext(AppContext), userStatus = _a.userStatus, setUserStatusTo = _a.setUserStatusTo;
    var handleOnClick = function () {
        setUserStatusTo(props.userStatus);
    };
    return id = { props: props, : .id };
    className = "user-status-button clear-button";
    disabled = { userStatus: userStatus } === props.userStatus;
};
type = "button";
onClick = { handleOnClick: handleOnClick }
    >
        className;
{
    props.icon;
}
/>
    < /button>;
var Menu = function () {
    return id = "app-menu" >
        id;
    "app-menu-content-wrapper" >
        id;
    "app-menu-content" >
        id;
    "app-menu-content-header" >
        className;
    "app-menu-content-header-section" >
        id;
    "app-menu-info" /  >
        />
        < /div>
        < div;
    className = "app-menu-content-header-section" >
        icon;
    "fa-solid fa-arrow-right-from-arc";
    id = "sign-out-button";
    userStatus = { UserStatus: UserStatus, : .LoggedOut }
        /  >
        /div>
        < /div>
        < QuickNav /  >
        id;
    "youtube-link";
    className = "clear-button";
    href = "https://www.youtube.com/c/Hyperplexed";
    target = "_blank" >
        className;
    "fa-brands fa-youtube" /  >
        Hyperplexed < /span>
        < /a>
        < Weather /  >
        />
        < Tools /  >
        />
        < /div>
        < /div>
        < /div>;
};
var Background = function () {
    var _a = React.useContext(AppContext), userStatus = _a.userStatus, setUserStatusTo = _a.setUserStatusTo;
    var handleOnClick = function () {
        if (userStatus === UserStatus.LoggedOut) {
            setUserStatusTo(UserStatus.LoggingIn);
        }
    };
    return id = "app-background";
    onClick = { handleOnClick: handleOnClick } >
        id;
    "app-background-image";
    className = "background-image" /  >
        /div>;
};
var Loading = function () {
    return id = "app-loading-icon" >
        className;
    "fa-solid fa-spinner-third" /  >
        /div>;
};
 *
    userStatus;
UserStatus;
setUserStatusTo: (function (status) { return void ; });
var AppContext = React.createContext(null);
var App = function () {
    var _a = React.useState(UserStatus.LoggedOut), userStatus = _a[0], setUserStatusTo = _a[1];
    var getStatusClass = function () {
        return userStatus.replace(/\s+/g, "-").toLowerCase();
    };
    return value = {};
    {
        userStatus, setUserStatusTo;
    }
};
 >
    id;
"app";
className = {} >
    id;
"app-info" /  >
    />
    < Menu /  >
    />   
    < div;
id = "sign-in-button-wrapper" >
    icon;
"fa-solid fa-arrow-right-to-arc";
id = "sign-in-button";
userStatus = { UserStatus: UserStatus, : .LoggingIn }
    /  >
    /div>                      
    < Loading /  >
    /div>
    < /AppContext.Provider>;
ReactDOM.render(/>, document.getElementById("root")););

//# sourceMappingURL=TP-1.js.map
