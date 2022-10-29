enum UserStatus {  
    LoggedIn = "Logged In",
    LoggingIn = "Logging In",
    LoggedOut = "Logged Out",
    LogInError = "Log In Error",
    VerifyingLogIn = "Verifying Log In"
  }
  
  enum Default {
    PIN = "1234"
  }
  
  enum WeatherType {
    Cloudy = "Cloudy",
    Rainy = "Rainy",
    Stormy = "Stormy",
    Sunny = "Sunny"
  }
  
  interface IPosition {
    left: number;
    x: number;
  }
  
  const defaultPosition = (): IPosition => ({
    left: 0,
    x: 0
  });
  
  interface INumberUtility {
    clamp: (min: number, value: number, max: number) => number;
    rand: (min: number, max: number) => number;
  }
  
  const N: INumberUtility = {
    clamp: (min: number, value: number, max: number) => Math.min(Math.max(min, value), max),
    rand: (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  interface ITimeUtility {
    format: (date: Date) => string;
    formatHours: (hours: number) => string;
    formatSegment: (segment: number) => string;
  }
  
  const T: ITimeUtility = {
    format: (date: Date): string => {
      const hours: string = T.formatHours(date.getHours()),
            minutes: string = date.getMinutes(),
            seconds: string = date.getSeconds();
      
      return `${hours}:${T.formatSegment(minutes)}`;
    },
    formatHours: (hours: number): string => {
      return hours % 12 === 0 ? 12 : hours % 12;
    },
    formatSegment: (segment: number): string => {
      return segment < 10 ? `0${segment}` : segment;
    }
  }
  
  interface ILogInUtility {
    verify: (pin: string) => Promise<boolean>;
  }
  
  const LogInUtility: ILogInUtility = {
    verify: async (pin: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(pin === Default.PIN) {
            resolve(true);
          } else {
            reject(`Invalid pin: ${pin}`);
          }
        }, N.rand(300, 700));
      });
    }
  }
  
  const useCurrentDateEffect = (): Date => {
    const [date, setDate] = React.useState<Date>(new Date());
  
    React.useEffect(() => {
      const interval: NodeJS.Timeout = setInterval(() => {
        const update: Date = new Date();
  
        if(update.getSeconds() !== date.getSeconds()) {
          setDate(update);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [date]);
    
    return date;
  }
  
  interface IScrollableComponentState {
    grabbing: boolean;
    position: IPosition;
  }
  
  interface IScrollableComponentProps {
    children: any;
    className?: string;
    id?: string;
  }
  
  const ScrollableComponent: React.FC<IScrollableComponentProps> = (props: IScrollableComponentProps) => {
    const ref: React.MutableRefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(null);
    
    const [state, setStateTo] = React.useState<IScrollableComponentState>({
      grabbing: false,
      position: defaultPosition()
    });
    
    const handleOnMouseDown = (e: any): void => {
      setStateTo({
        ...state,
        grabbing: true,
        position: {
          x: e.clientX,
          left: ref.current.scrollLeft
        }
      });
    }
    
    const handleOnMouseMove = (e: any): void => {
      if(state.grabbing) {
        const left: number = Math.max(0, state.position.left + (state.position.x - e.clientX));
        
        ref.current.scrollLeft = left;
      }
    }
    
    const handleOnMouseUp = (): void => {
      if(state.grabbing) {
        setStateTo({ ...state, grabbing: false });
      }
    }
    
    return (
      <div 
        ref={ref} 
        className={classNames("scrollable-component", props.className)}
        id={props.id}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUp}
        onMouseLeave={handleOnMouseUp}
      >
        {props.children}
      </div>
    );
  }
  
  const WeatherSnap: React.FC = () => {  
    const [temperature] = React.useState<number>(N.rand(65, 85));
    
    return(
      <span className="weather">
        <i className="weather-type" className="fa-duotone fa-sun" />
        <span className="weather-temperature-value">{temperature}</span>
        <span className="weather-temperature-unit">°F</span>
      </span>
    )
  }
  
  const Reminder: React.FC = () => {
    return(
      <div className="reminder">
        <div className="reminder-icon">
          <i className="fa-regular fa-bell" />
        </div>
        <span className="reminder-text">Extra cool people meeting <span className="reminder-time">10AM</span></span>      
      </div>
    )
  }
  
  const Time: React.FC = () => {
    const date: Date = useCurrentDateEffect();
    
    return(
      <span className="time">{T.format(date)}</span>
    )
  }
  
  interface IInfoProps {
    id?: string;
  }
  
  const Info: React.FC = (props: IInfoProps) => {  
    return(
      <div id={props.id} className="info">
        <Time />
        <WeatherSnap />
      </div>
    )
  }
  
  interface IPinDigitProps {
    focused: boolean;
    value: string;
  }
  
  const PinDigit: React.FC<IPinDigitProps> = (props: IPinDigitProps) => {
    const [hidden, setHiddenTo] = React.useState<boolean>(false);
    
    React.useEffect(() => {
      if(props.value) {
        const timeout: NodeJS.Interval = setTimeout(() => {
          setHiddenTo(true);
        }, 500);
  
        return () => {
          setHiddenTo(false);
          
          clearTimeout(timeout);
        }
      }
    }, [props.value]);
    
    return (
      <div className={classNames("app-pin-digit", { focused: props.focused, hidden })}>
        <span className="app-pin-digit-value">{props.value || ""}</span>
      </div>
    ) 
  }
  
  const Pin: React.FC = () => {
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    
    const [pin, setPinTo] = React.useState<string>("");
    
    const ref: React.MutableRefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null);
    
    React.useEffect(() => {
      if(userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) {
        ref.current.focus();
      } else {
        setPinTo("");
      }
    }, [userStatus]);
    
    React.useEffect(() => {
      if(pin.length === 4) {
        const verify = async (): Promise<void> => {
          try {
            setUserStatusTo(UserStatus.VerifyingLogIn);
            
            if(await LogInUtility.verify(pin)) {          
              setUserStatusTo(UserStatus.LoggedIn);
            }
          } catch (err) {
            console.error(err);
            
            setUserStatusTo(UserStatus.LogInError);
          }
        }
        
        verify();
      }
      
      if(userStatus === UserStatus.LogInError) {
        setUserStatusTo(UserStatus.LoggingIn);
      }
    }, [pin]);
    
    const handleOnClick = (): void => {
      ref.current.focus();
    }
    
    const handleOnCancel = (): void => {
      setUserStatusTo(UserStatus.LoggedOut);
    }
    
    const handleOnChange = (e: any): void => {
      if(e.target.value.length <= 4) {
        setPinTo(e.target.value.toString());
      }
    }
    
    const getCancelText = (): JSX.Element => {
      return (
        <span id="app-pin-cancel-text" onClick={handleOnCancel}>Cancel</span>
      )
    }
    
    const getErrorText = (): JSX.Element => {
      if(userStatus === UserStatus.LogInError) {
        return (
          <span id="app-pin-error-text">Invalid</span>
        )
      }
    }
    
    return(
      <div id="app-pin-wrapper">
        <input 
          disabled={userStatus !== UserStatus.LoggingIn && userStatus !== UserStatus.LogInError}
          id="app-pin-hidden-input" 
          maxLength={4} 
          ref={ref}
          type="number" 
          value={pin} 
          onChange={handleOnChange} 
        />
        <div id="app-pin" onClick={handleOnClick}>
          <PinDigit focused={pin.length === 0} value={pin[0]} />
          <PinDigit focused={pin.length === 1} value={pin[1]} />
          <PinDigit focused={pin.length === 2} value={pin[2]} />
          <PinDigit focused={pin.length === 3} value={pin[3]} />
        </div>
        <h3 id="app-pin-label">Enter PIN (1234) {getErrorText()} {getCancelText()}</h3>
      </div>
    )
  }
  
  interface IMenuSectionProps {
    children: any;
    icon: string;
    id: string;
    scrollable?: boolean;
    title: string;
  }
  
  const MenuSection: React.FC<IMenuSectionProps> = (props: IMenuSectionProps) => {
    const getContent = (): JSX.Element => {
      if(props.scrollable) {
        return (
          <ScrollableComponent className="menu-section-content">
            {props.children}
          </ScrollableComponent>
        );
      }
    
      return (    
        <div className="menu-section-content">
          {props.children}  
        </div>
      );
    }
    
    return (
      <div id={props.id} className="menu-section">
        <div className="menu-section-title">
          <i className={props.icon} />
          <span className="menu-section-title-text">{props.title}</span>
        </div>
        {getContent()}
      </div>
    )
  }
  
  const QuickNav: React.FC = () => {  
    const getItems = (): JSX.Element[] => {
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
      }].map((item: any) => {
        return (
          <div key={item.id} className="quick-nav-item clear-button">
            <span className="quick-nav-item-label">{item.label}</span>
          </div>
        );
      })
    }
  
    return (
      <ScrollableComponent id="quick-nav">
        {getItems()}    
      </ScrollableComponent>
    );
  }
  
  const Weather: React.FC = () => { 
    const getDays = (): JSX.Element[] => {
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
      }].map((day: any) => {
        const getIcon = (): string => {
          switch(day.weather) {
            case WeatherType.Cloudy:
              return "fa-duotone fa-clouds";
            case WeatherType.Rainy:
              return "fa-duotone fa-cloud-drizzle";
            case WeatherType.Stormy:
              return "fa-duotone fa-cloud-bolt";
            case WeatherType.Sunny:
              return "fa-duotone fa-sun";
          }
        }
        
        return (
          <div key={day.id} className="day-card">
            <div className="day-card-content">
              <span className="day-weather-temperature">{day.temperature}<span className="day-weather-temperature-unit">°F</span></span>
              <i className={classNames("day-weather-icon", getIcon(), day.weather.toLowerCase())} />
              <span className="day-name">{day.name}</span>  
            </div>  
          </div>
        );
      });
    }
    return(
      <MenuSection icon="fa-solid fa-sun" id="weather-section" scrollable title="How's it look out there?">
        {getDays()}
      </MenuSection>
    )
  }
  
  const Tools: React.FC = () => {  
    const getTools = (): JSX.Element[] => {
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
      }].map((tool: any) => {
        const styles: React.CSSProperties = {
          backgroundImage: `url(${tool.image})`  
        }
        
        return (
          <div key={tool.id} className="tool-card">
            <div className="tool-card-background background-image" style={styles} />
            <div className="tool-card-content">            
              <div className="tool-card-content-header">            
                <span className="tool-card-label">{tool.label}</span>
                <span className="tool-card-name">{tool.name}</span>
              </div>
              <i className={classNames(tool.icon, "tool-card-icon")} />
            </div>
          </div>
        );
      })
    }
    
    return (
      <MenuSection icon="fa-solid fa-toolbox" id="tools-section" title="What's Appening?">
        {getTools()}
      </MenuSection>
    );
  }
  
  const Restaurants: React.FC = () => {  
    const getRestaurants = (): JSX.Element[] => {
      return [{
        desc: "The best burgers in town",
        id: 1,
        image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YnVyZ2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        title: "Burgers"
      } , {
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
      }].map((restaurant: any) => {
        const styles: React.CSSProperties = {
          backgroundImage: `url(${restaurant.image})`  
        }
        
        return (
          <div key={restaurant.id} className="restaurant-card background-image" style={styles}>
            <div className="restaurant-card-content">
              <div className="restaurant-card-content-items">
                <span className="restaurant-card-title">{restaurant.title}</span>
                <span className="restaurant-card-desc">{restaurant.desc}</span>  
              </div>
            </div>
          </div>
        )
      });
    }
    return(   
      <MenuSection icon="fa-regular fa-pot-food" id="restaurants-section" title="Get it delivered!">
        {getRestaurants()}
      </MenuSection>
    )
  }
  
  const Movies: React.FC = () => {  
    const getMovies = (): JSX.Element[] => {
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
      }].map((movie: any) => {
        const styles: React.CSSProperties = {
          backgroundImage: `url(${movie.image})`  
        }
        
        const id: string = `movie-card-${movie.id}`;
        
        return (
          <div key={movie.id} id={id} className="movie-card">
            <div className="movie-card-background background-image" style={styles} />
            <div className="movie-card-content">
              <div className="movie-card-info">
                <span className="movie-card-title">{movie.title}</span>
                <span className="movie-card-desc">{movie.desc}</span>
              </div>
              <i className={movie.icon} />
            </div>
          </div>
        );
      })
    }
  
    return (
      <MenuSection icon="fa-solid fa-camera-movie" id="movies-section" scrollable title="Popcorn time!">
        {getMovies()}    
      </MenuSection>
    );
  }
  
  interface IUserStatusButton {
    icon: string;
    id: string;
    userStatus: UserStatus;
  }
  
  const UserStatusButton: React.FC<IUserStatusButton> = (props: IUserStatusButton) => {  
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    
    const handleOnClick = (): void => {
      setUserStatusTo(props.userStatus);
    }
    
    return(   
      <button   
        id={props.id} 
        className="user-status-button clear-button" 
        disabled={userStatus === props.userStatus}
        type="button" 
        onClick={handleOnClick}
      >      
        <i className={props.icon} />
      </button>
    )
  }
  
  const Menu: React.FC = () => {  
    return(   
      <div id="app-menu">      
        <div id="app-menu-content-wrapper">
          <div id="app-menu-content">
            <div id="app-menu-content-header">
              <div className="app-menu-content-header-section">
                <Info id="app-menu-info" />
                <Reminder />
              </div>
              <div className="app-menu-content-header-section">
                <UserStatusButton 
                  icon="fa-solid fa-arrow-right-from-arc" 
                  id="sign-out-button" 
                  userStatus={UserStatus.LoggedOut}
                />
              </div>
            </div>
            <QuickNav />
            <a id="youtube-link" className="clear-button" href="https://www.youtube.com/c/Hyperplexed" target="_blank">
              <i className="fa-brands fa-youtube" />  
              <span>Hyperplexed</span>
            </a>
            <Weather />                  
            <Restaurants />
            <Tools />
            <Movies />
          </div>
        </div>
      </div>
    )
  }
  
  const Background: React.FC = () => {  
    const { userStatus, setUserStatusTo } = React.useContext(AppContext);
    
    const handleOnClick = (): void => {
      if(userStatus === UserStatus.LoggedOut) {
        setUserStatusTo(UserStatus.LoggingIn);
      }
    }
    
    return(   
      <div id="app-background" onClick={handleOnClick}>
        <div id="app-background-image" className="background-image" />
      </div>
    )
  }
  
  const Loading: React.FC = () => {  
    return(    
      <div id="app-loading-icon">
        <i className="fa-solid fa-spinner-third" />
      </div>
    )
  }
  
  interface IAppContext {*   
    userStatus: UserStatus;
    setUserStatusTo: (status: UserStatus) => void;
  }
  
  const AppContext = React.createContext<IAppContext>(null);
  
  const App: React.FC = () => {
    const [userStatus, setUserStatusTo] = React.useState<UserStatus>(UserStatus.LoggedOut);
    
    const getStatusClass = (): string => {
      return userStatus.replace(/\s+/g, "-").toLowerCase();
    }
    
    return(
      <AppContext.Provider value={{ userStatus, setUserStatusTo }}>
        <div id="app" className={getStatusClass()}>
          <Info id="app-info" />
          <Pin />
          <Menu />
          <Background />   
          <div id="sign-in-button-wrapper">
            <UserStatusButton 
              icon="fa-solid fa-arrow-right-to-arc" 
              id="sign-in-button" 
              userStatus={UserStatus.LoggingIn}
            />       
          </div>                      
          <Loading />
        </div>
      </AppContext.Provider>
    )
  }
  
  ReactDOM.render(<App/>, document.getElementById("root"));