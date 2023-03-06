import React, { Children, useState } from 'react'
import axios from 'axios';
import { Grommet, Page, PageContent, Box, Heading, Button, Text, Grid, Card, CardBody, CardHeader, Form, FormField, TextInput } from 'grommet'
import { UserNew, HomeRounded, Restaurant, Aid } from 'grommet-icons'

const RouterContext = React.createContext({})

const Router = ({ children }) => {
  const [path, setPath] = React.useState("/")

  React.useEffect(() => {
    const onPopState = () => setPath(document.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const push = nextPath => {
    if (nextPath !== path) {
      window.history.pushState(undefined, undefined, nextPath)
      setPath(nextPath)
      window.scrollTo(0, 0)
    }
  }

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  )
}

const Routes = ({ children }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  let found
  Children.forEach(children, child => {
    if (!found && contextPath === child.props.path) found = child
  })
  return found
}

const Route = ({ Component, path }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  return contextPath === path ? <Component /> : null
}


const Screen = () => {
    const { push } = React.useContext(RouterContext)
  
  return (
    <Page>
      <PageContent>
        <Box align="center" justify="center" direction="column" gap="none" elevation="none" round="small" pad="xsmall">
          <Heading color="accent-4" size="medium" level="1" textAlign="start">
            Furever Animal rescue
          </Heading>
        </Box>
        <Box align="center" justify="center" direction="column" gap="xsmall" margin="medium" elevation="none" round="small">
          <Button label="Sign up" icon={<UserNew />} secondary type="button" onClick={() => push("/screen-2")} />
          <Text>
            Join hands in our mission to enable a better worlds for the all the animals
          </Text>
        </Box>
        <Box align="center" justify="center" pad="xlarge" direction="column" fill={false} gap="xxsmall">
          <Grid gap="xlarge" fill="horizontal" columns={{"size":"small","count":"fit"}}>
            <Card>
              <CardBody pad="small" align="center" justify="center" direction="row">
                <HomeRounded size="large" color="accent-4" />
              </CardBody>
              <CardHeader align="center" direction="column" flex={false} justify="center" gap="medium" pad="small">
                <Text weight="bold" size="medium" textAlign="center">
                  Home
                </Text>
                <Text textAlign="center">
                  We provide fur-beings of all forms, shapes, colors and sizes a loving and caring safe haven and a "Fur"ever home with us
                </Text>
              </CardHeader>
            </Card>
            <Card>
              <CardBody pad="small" align="center" justify="center" direction="row">
                <Restaurant size="large" color="accent-4" />
              </CardBody>
              <CardHeader align="center" direction="column" flex={false} justify="center" gap="medium" pad="small">
                <Text weight="bold" size="medium" textAlign="center">
                  Food
                </Text>
                <Text textAlign="center">
                  All animals in Furever and beyond are served with nutritious and stumptous meals everyday around the year, every year
                </Text>
              </CardHeader>
            </Card>
            <Card>
              <CardBody pad="small" align="center" justify="center" direction="row">
                <Aid size="large" color="accent-4" />
              </CardBody>
              <CardHeader align="center" direction="column" flex={false} justify="center" gap="medium" pad="small">
                <Text weight="bold" size="medium">
                  Wellbeing
                </Text>
                <Text textAlign="center">
                  All animals in Furever are nurtured back to health and we place immense importance of the wellbeing of our "fur"kids
                </Text>
              </CardHeader>
            </Card>
          </Grid>
        </Box>
      </PageContent>
    </Page>
  )
}

const Screen2 = () => {
  const [value, setValue] = useState({})
  const [result, setResult] = useState(false)
  const handleSubmit = (value) => {
      if (value["pwd"] == value["pwd-confirm"]){
        axios.post('http://localhost:3001/signup', value)
        .then(res => setResult(true))
        .catch(err => console.log(err));
      }
      else
        {
          alert("Passwords do not match, please verify and submit again")
        }
  };

  return (
    <Page>
      <PageContent>
        <Box align="stretch" justify="center" direction="column" fill="horizontal" pad={{"horizontal":"xlarge"}}>
          <Heading size="medium" textAlign="center" margin={{"top":"small"}}>
            Sign Up
          </Heading>
          <Form 
            value = {value}
            onChange={nextValue => setValue(nextValue)}
            onReset={()=> setValue({})}
            onSubmit={({value}) => {handleSubmit(value)}}
          >
            <FormField name="name" label="Name" disabled={false} required>
              <TextInput name="name"/>
            </FormField>
            <FormField name="phone" label="Phone Number" disabled={false} required>
              <TextInput name="phone" />
            </FormField>
            <FormField name="email" label="Email address" disabled={false} required>
              <TextInput name="email" />
            </FormField>
            <FormField name="pwd" label="Password" disabled={false} required>
              <TextInput name="pwd" type="password" />
            </FormField>
            <FormField name="pwd-confirm" label="Confirm Password" disabled={false} required>
              <TextInput name="pwd-confirm" type="password" />
            </FormField>
            <Box align="center" justify="between" direction="row">
              <Button label="Reset" type="reset" />
              <Button label="Submit" type="submit" />
            </Box>
            <Box align="center" justify="between" direction="row">
            {result && <Text>
              Sign up successful. 
              Thank you for your support in saving lives!
            </Text>}
            </Box>          
          </Form>
        </Box>
      </PageContent>
    </Page>
  )
}

const App = () => (
  <Grommet full >
    <Router>
      <Routes>
        <Route path="/" Component={Screen} />
        <Route path="/screen-2" Component={Screen2} />
      </Routes>
    </Router>
  </Grommet>
);

export default App;
